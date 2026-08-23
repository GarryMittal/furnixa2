// import { Link } from "react-router";
// import { PlusIcon } from "lucide-react";
// import { formatPrice } from "../utils/format.js";
// import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";
// import { useCart } from "../store/cart.js";

// export function CatalogProductCard({ product }) {
//   const addItem = useCart((s) => s.addItem);

//   return (
//     <article className="card group h-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-800/40 hover:shadow-lg">
//       <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
//         <figure className="aspect-[4/3] bg-base-300">
//           {product.imageUrl ? (
//             <img
//               src={imageKitOptimizedUrl(product.imageUrl, IK_PRESETS.catalogCard)}
//               alt=""
//               className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
//               loading="lazy"
//               decoding="async"
//             />
//           ) : null}
//         </figure>
//         <span className="badge badge-sm absolute left-3 top-3 border-0 bg-white/90 px-2.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-700 backdrop-blur">
//           {product.category ?? "General"}
//         </span>
//       </Link>

//       <div className="card-body grow gap-3 p-5 text-left">
//         <Link
//           to={`/product/${product.slug}`}
//           className="card-title line-clamp-2 text-base font-semibold text-neutral-900 transition group-hover:text-amber-800"
//         >
//           {product.name}
//         </Link>
//         <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
//           {product.description}
//         </p>
//         <div className="card-actions mt-auto items-center justify-between border-t border-base-200 pt-4">
//           <span className="text-lg font-bold tabular-nums text-neutral-900">
//             {formatPrice(product.priceCents, product.currency)}
//           </span>
//           <button
//             type="button"
//             onClick={() => addItem(product.id)}
//             className="btn btn-sm gap-1.5 rounded-lg border-0 bg-neutral-900 text-white shadow-none hover:bg-black"
//           >
//             <PlusIcon className="size-4" aria-hidden />
//             Add
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";
import { useCart } from "../store/cart.js";

export function CatalogProductCard({ product }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <article className="card group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-800/30 hover:shadow-md">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden bg-neutral-100">
        <figure className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
          {product.imageUrl ? (
            <img
              src={imageKitOptimizedUrl(product.imageUrl, IK_PRESETS.catalogCard)}
              alt={product.name}
              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-400 text-xs">
              No image
            </div>
          )}
        </figure>
        <span className="badge badge-sm absolute left-3 top-3 border-0 bg-white/90 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-neutral-800 shadow-sm backdrop-blur-md">
          {product.category ?? "General"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 text-left">
        <div className="space-y-2">
          <Link
            to={`/product/${product.slug}`}
            className="card-title line-clamp-1 text-base font-semibold text-neutral-900 transition-colors group-hover:text-amber-800"
          >
            {product.name}
          </Link>
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {product.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Price</span>
            <span className="text-lg font-bold tracking-tight text-neutral-900 tabular-nums">
              {formatPrice(product.priceCents, product.currency)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="cursor-pointer btn btn-sm inline-flex items-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-amber-900 active:scale-95"
          >
            <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}