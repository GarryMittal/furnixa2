import { CatalogProductCard } from "../components/CatalogProductCard";
import { SentryErrorFallback } from "../components/SentryErrorFallback";
// import { PageError } from "../components/PageError";
import { useHomeCatalog } from "../hooks/useHomeCatalog";

function ShopPage() {
  const {
    products,
    categories,
    categoryChipsLoading,
    categoryFilter,
    error,
    loadingList,
    setCategory,
  } = useHomeCatalog();

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen bg-[#EFE9E3] py-12 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-base-content">
          {categoryFilter || "All Products"}
        </h1>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-medium transition-all shadow-sm ${
              !categoryFilter
                ? "bg-neutral-900 text-white shadow-md hover:bg-neutral-800"
                : "bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100/60 hover:text-neutral-900"
            }`}
            onClick={() => setCategory("")}
          >
            All
          </button>

          {categoryChipsLoading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="skeleton h-8 w-20 rounded-lg"
                  aria-hidden
                />
              ))
            : categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-medium transition-all shadow-sm ${
                    categoryFilter === c
                      ? "bg-neutral-900 text-white shadow-md hover:bg-neutral-800"
                      : "bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100/60 hover:text-neutral-900"
                  }`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
        </div>
      </div>

      {loadingList ? (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <li key={i}>
              <div className="skeleton h-96 w-full rounded-box" />
            </li>
          ))}
        </ul>
      ) : error ? (
        <SentryErrorFallback />
      ) : products.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100 py-16 text-center text-base-content/60">
          No products in this category yet.
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <CatalogProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default ShopPage;
