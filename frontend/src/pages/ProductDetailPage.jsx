// import { Link } from "react-router";
// import { ProductPageSkeleton } from "../components/LoadingSkeletons";
// import { PageError } from "../components/PageError";
// import useProductPage from "../hooks/useProductPage";
// import { useCart } from "../store/cart";
// import { ArrowLeftIcon,ShoppingCartIcon } from "lucide-react";
// import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl";
// import { formatPrice } from "../utils/format";

// function ProductDetailPage() {
//   const addItem = useCart((s) => s.addItem);

//   const { product, isLoading, error } = useProductPage();

//   if (isLoading) return <ProductPageSkeleton />;
//   if (error || !product) {
//     return (
//       <PageError
//         message="Product not found."
//         action={{ to: "/", label: "Back to shop" }}
//       />
//     );
//   }
//   const p = product;
//   const category = p.category ?? "All";
//   console.log(p);
//   return  <div>
//       <nav className="breadcrumbs text-sm text-base-content/60">
//         <ul>
//           <li>
//             <Link to="/">Shop</Link>
//           </li>
//           <li>
//             <Link to={`/?category=${encodeURIComponent(category)}`}>{category}</Link>
//           </li>
//           <li className="text-base-content">{p.name}</li>
//         </ul>
//       </nav>

//       <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
//         <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-lg">
//           <figure className="aspect-square bg-base-300">
//             {p.imageUrl ? (
//               <img
//                 src={imageKitOptimizedUrl(p.imageUrl, IK_PRESETS.productHero)}
//                 alt=""
//                 className="h-full w-full object-cover"
//                 fetchPriority="high"
//                 decoding="async"
//               />
//             ) : (
//               <div className="h-full w-full" />
//             )}
//           </figure>

          
//         </div>

//         <div className="flex flex-col text-left">
//           <div className="flex flex-wrap items-center gap-2">
//             <span className="badge badge-primary badge-outline">{category}</span>
//             <span className="text-xs font-mono text-base-content/45">{p.slug}</span>
//           </div>

//           <h1 className="mt-3 text-3xl font-bold tracking-tight text-base-content md:text-4xl">
//             {p.name}
//           </h1>

//           <p className="mt-3 text-3xl font-bold tabular-nums text-primary md:text-4xl">
//             {formatPrice(p.priceCents, p.currency)}
//           </p>

//           <p className="mt-6 text-base leading-relaxed text-base-content/85">{p.description}</p>

//           {/* <ul className="mt-6 space-y-2 rounded-box border border-base-300 bg-base-200/50 p-4">
//             {HIGHLIGHTS.map((h) => (
//               <li key={h} className="flex items-center gap-2 text-sm text-base-content/80">
//                 <CheckIcon className="size-4 shrink-0 text-success" aria-hidden />
//                 {h}
//               </li>
              
//             ))}
//           </ul> */}

//           <div className="mt-8 flex flex-wrap gap-3">
//             <button
//               type="button"
//               onClick={() => addItem(p.id)}
//               className="btn btn-primary btn-lg gap-2 shadow-lg"
//             >
//               <ShoppingCartIcon className="size-5" aria-hidden />
              
//               Add to cart
//             </button>

//             <Link to="/" className="btn btn-ghost btn-lg gap-2 border border-base-300">
//               <ArrowLeftIcon className="size-4" aria-hidden />
//               Continue shopping
              
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
// }

// export default ProductDetailPage;


import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ProductPageSkeleton } from "../components/LoadingSkeletons";
import { PageError } from "../components/PageError";
import useProductPage from "../hooks/useProductPage";
import { useCart } from "../store/cart";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Maximize2Icon,
  ShoppingCartIcon,
  XIcon,
} from "lucide-react";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl";
import { formatPrice } from "../utils/format";

// Subtle warm-linen texture for the page background — pure CSS, no image asset.
const TEXTURE_STYLE = {
  backgroundColor: "#F7F7F7",
  backgroundImage:
    "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.035) 1px, transparent 0)",
  backgroundSize: "18px 18px",
};

function ProductDetailPage() {
  const addItem = useCart((s) => s.addItem);
  const { product, isLoading, error } = useProductPage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = useMemo(() => {
    if (!product) return [];
    const list =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : product.imageUrl
          ? [{ id: "primary", imageUrl: product.imageUrl, isPrimary: true }]
          : [];
    return [...list].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
  }, [product]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
  }, [product?.id]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, images.length]);

  if (isLoading) return <ProductPageSkeleton />;
  if (error || !product) {
    return (
      <PageError
        message="Product not found."
        action={{ to: "/shop", label: "Back to shop" }}
      />
    );
  }

  const p = product;
  const category = p.category ?? "All";
  const activeImage = images[activeIndex];

  return (
    <div style={TEXTURE_STYLE}>
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-16">
        <nav className="text-sm text-neutral-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/shop" className="transition hover:text-amber-800">
                Shop
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li>
              <Link
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="transition hover:text-amber-800"
              >
                {category}
              </Link>
            </li>
            <li className="text-neutral-300">/</li>
            <li className="text-neutral-900">{p.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <button
              type="button"
              onClick={() => images.length > 0 && setLightboxOpen(true)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm"
            >
              {activeImage ? (
                <img
                  src={imageKitOptimizedUrl(activeImage.imageUrl, IK_PRESETS.productHero)}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full" />
              )}

              {images.length > 0 ? (
                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-neutral-950/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Maximize2Icon className="size-3.5" aria-hidden />
                  View large
                </span>
              ) : null}
            </button>

            {images.length > 1 ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.id ?? i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition ${
                      i === activeIndex
                        ? "border-amber-800"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === activeIndex}
                  >
                    <img
                      src={imageKitOptimizedUrl(img.imageUrl, IK_PRESETS.adminThumb)}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-amber-800/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
                {category}
              </span>
              <span className="font-mono text-xs text-neutral-400">{p.slug}</span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {p.name}
            </h1>

            <p className="mt-3 text-3xl font-bold tabular-nums text-amber-800 md:text-4xl">
              {formatPrice(p.priceCents, p.currency)}
            </p>

            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              {p.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => addItem(p.id)}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
              >
                <ShoppingCartIcon className="size-5" aria-hidden />
                Add to cart
              </button>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-7 py-3.5 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
              >
                <ArrowLeftIcon className="size-4" aria-hidden />
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <XIcon className="size-5" aria-hidden />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i - 1 + images.length) % images.length);
                }}
                className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="size-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % images.length);
                }}
                className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
                aria-label="Next image"
              >
                <ChevronRightIcon className="size-6" aria-hidden />
              </button>
            </>
          ) : null}

          <img
            src={imageKitOptimizedUrl(activeImage.imageUrl, IK_PRESETS.formPreview)}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetailPage;