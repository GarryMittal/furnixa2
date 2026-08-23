import { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { products } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function listProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cat =
      typeof req.query.category === "string" ? req.query.category.trim() : "";

    const rows = await db.query.products.findMany({
      where: (products, { eq, and }) => {
        const activeCondition = eq(products.active, true);
        return cat
          ? and(activeCondition, eq(products.category, cat))
          : activeCondition;
      },
      with: {
        images: true, // This brings in the product_images relation
      },
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });

    // 🔑 THIS MAP IS CRITICAL: Extracts the primary image URL and adds it as `imageUrl`
    const formattedProducts = rows.map((product) => {
      const primaryImage =
        product.images?.find((img) => img.isPrimary) || product.images?.[0];
      return {
        ...product,
        imageUrl: primaryImage ? primaryImage.imageUrl : null,
      };
    });

    res.json({ products: formattedProducts });
  } catch (err) {
    next(err);
  }
}

export async function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = await db
      .select({ category: products.category })
      .from(products)
      .where(eq(products.active, true));

    const categories = [...new Set(rows.map((r) => r.category))].sort((a, b) =>
      a.localeCompare(b),
    );

    res.json({ categories });
  } catch (e) {
    next(e);
  }
}

// export async function getProductBySlug(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const [row] = await db
//       .select()
//       .from(products)
//       .where(eq(products.slug, req.params.slug as string))
//       .limit(1);

//     if (!row || !row.active)
//       return res.status(404).json({ error: "Not found" });

//     res.json({ product: row });
//   } catch (e) {
//     next(e);
//   }
// }

export async function getProductBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const row = await db.query.products.findFirst({
      where: (products, { eq }) =>
        eq(products.slug, req.params.slug as string),

      with: {
        images: true,
      },
    });

    if (!row || !row.active) {
      return res.status(404).json({ error: "Not found" });
    }

    const primaryImage =
      row.images.find((img) => img.isPrimary) ?? row.images[0];

    res.json({
      product: {
        ...row,
        imageUrl: primaryImage?.imageUrl ?? null,
      },
    });
  } catch (e) {
    next(e);
  }
}