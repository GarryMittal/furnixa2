import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { getLocalUser } from "../lib/users.js";
import { isAdmin } from "../lib/roles.js";
import ImageKit from "@imagekit/nodejs";
import { getEnv } from "../lib/env.js";
import { db } from "../db/index.js";
import { orderItems, products, productImages } from "../db/schema.js";
import { count, eq } from "drizzle-orm";
import { z } from "zod";
import { deleteImageKitAsset } from "../lib/imagekit.js";

const env = getEnv();
const imageSchema = z.object({
  imageUrl: z.string().url(),
  imageKitFileId: z.string().min(1),
  isPrimary: z.boolean().optional(),
});
const productCreate = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1).default("General"),
  description: z.string().default(""),
  priceCents: z.number().int().positive(),
  currency: z.string().min(1).default("usd"),
  active: z.boolean().default(true),

  images: z.array(imageSchema).min(1),
});

const productPatch = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  priceCents: z.number().int().positive().optional(),
  currency: z.string().min(1).optional(),
  active: z.boolean().optional(),
});

function buildProductUpdateSet(body: z.infer<typeof productPatch>) {
  const data: Partial<typeof products.$inferInsert> = {};
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.name !== undefined) data.name = body.name;
  if (body.category !== undefined) data.category = body.category;
  if (body.description !== undefined) data.description = body.description;
  if (body.priceCents !== undefined) data.priceCents = body.priceCents;
  if (body.currency !== undefined) data.currency = body.currency;

  if (body.active !== undefined) data.active = body.active;
  return data;
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await getLocalUser(userId);

    if (!isAdmin(user.role)) {
      res.status(403).json({ error: "Admin only" });
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
}

export function getImageKitAuth(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const client = new ImageKit({ privateKey: env.IMAGEKIT_PRIVATE_KEY });

    const auth = client.helper.getAuthenticationParameters();

    res.json({
      ...auth,
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    });
  } catch (e) {
    next(e);
  }
}

// export async function listAdminProducts(
//   _req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const rows = await db
//       .select()
//       .from(products)
//       .orderBy(desc(products.createdAt));
//     res.json({ products: rows });
//   } catch (e) {
//     next(e);
//   }
// }

export async function listAdminProducts(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = await db.query.products.findMany({
      with: {
        images: true,
      },
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });

    res.json({
      products: rows,
    });
  } catch (e) {
    next(e);
  }
}

export async function createAdminProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = productCreate.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid body",
        details: parsed.error.flatten(),
      });
      return;
    }
    const product = await db.transaction(async (tx) => {
      // Create the product first
      const [createdProduct] = await tx
        .insert(products)
        .values({
          slug: parsed.data.slug,
          name: parsed.data.name,
          category: parsed.data.category,
          description: parsed.data.description,
          priceCents: parsed.data.priceCents,
          currency: parsed.data.currency,

          active: parsed.data.active,
        })
        .returning();
      // Create all product images
      await tx.insert(productImages).values(
        parsed.data.images.map((img, index) => ({
          productId: createdProduct.id,
          imageUrl: img.imageUrl,
          imageKitFileId: img.imageKitFileId,
          isPrimary: img.isPrimary ?? index === 0,
        })),
      );

      return createdProduct;
    });

    res.status(201).json({ product });
  } catch (e) {
    next(e);
  }
}

export async function updateAdminProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = productPatch.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Invalid body", details: parsed.error.flatten() });
      return;
    }

    const data = buildProductUpdateSet(parsed.data);

    if (Object.keys(data).length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    const [row] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, req.params.id as string))
      .returning();

    if (!row) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json({ product: row });
  } catch (e) {
    next(e);
  }
}

// export async function deleteAdminProduct(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const id = req.params.id as string;
//     const [existing] = await db
//       .select()
//       .from(products)
//       .where(eq(products.id, id))
//       .limit(1);
//     if (!existing) {
//       res.status(404).json({ error: "Not found" });
//       return;
//     }

//     const [countRow] = await db
//       .select({ c: count() })
//       .from(orderItems)
//       .where(eq(orderItems.productId, id));

//     if (Number(countRow?.c ?? 0) > 0) {
//       res.status(409).json({
//         error:
//           "This product is on one or more orders and cannot be deleted. Deactivate it instead.",
//       });
//       return;
//     }

//     await deleteImageKitAsset(env, existing.imageKitFileId);
//     await db.delete(products).where(eq(products.id, id));

//     res.json({ ok: true });
//   } catch (e) {
//     next(e);
//   }
// }

export async function deleteAdminProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id as string;

    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!existing) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    const [countRow] = await db
      .select({ c: count() })
      .from(orderItems)
      .where(eq(orderItems.productId, id));

    if (Number(countRow?.c ?? 0) > 0) {
      res.status(409).json({
        error:
          "This product is on one or more orders and cannot be deleted. Deactivate it instead.",
      });
      return;
    }

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, id));

    // for (const image of images) {
    //   await deleteImageKitAsset(env, image.imageKitFileId);
    // }

    await Promise.all(
      

      images.map(async (img) => await deleteImageKitAsset(env, img.imageKitFileId)),
      
    );


    await db.delete(products).where(eq(products.id, id));

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
