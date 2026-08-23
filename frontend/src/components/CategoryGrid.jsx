import { Link } from "react-router";

// Matches a category name to its downloaded image filename in /public.
// "Living Room" -> "/livingroom.jpg", "Bedroom" -> "/bedroom.jpg", etc.
// No separator, matching your current filenames exactly.
function categoryImage(name) {
  const normalized = name.toLowerCase().trim();

  // Map database category names to actual public image filenames if they differ
  const imageMap = {
    study: "studyroom.jpg",
    "study room": "studyroom.jpg",
    // Add any other custom mappings here if needed, e.g.:
    // "bathroom": "bathroom.jpg",
  };

  if (imageMap[normalized]) {
    return `/${imageMap[normalized]}`;
  }

  // Fallback to automatic slug generation for other categories
  const slug = normalized.replace(/[^a-z0-9]/g, "");
  return `/${slug}.jpg`;
}

// TEMP: shown only while the backend/DB has no categories yet, so you can
// see and style the grid. Delete this once real data is flowing — the
// component already prefers real `categories` whenever it has any.
const DEV_FALLBACK_CATEGORIES = [
  "Bedroom",
  "Living Room",
  "Kitchen",
  "Dining Room",
  "Study",
  "Bathroom",
];

export function CategoryGrid({ categories = [], loading = false }) {
  const showFallback = !loading && categories.length === 0;
  const items = showFallback ? DEV_FALLBACK_CATEGORIES : categories;

  if (!loading && items.length === 0) return null;

  return (
    <section
      aria-labelledby="shop-by-category"
      className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16"
    >
      <h2
        id="shop-by-category"
        className="mb-6 font-mono text-2xl font-bold uppercase tracking-tight text-base-content"
      >
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="skeleton aspect-[4/5] w-full rounded-2xl"
                aria-hidden
              />
            ))
          : items.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-base-300"
              >
                <img
                  src={categoryImage(category)}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => e.currentTarget.remove()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold uppercase tracking-wider text-white">
                  {category}
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
}
