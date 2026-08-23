// Image optimization is very important for any web application.
// Instead of storing multiple image sizes, we store one original ImageKit URL
// and generate optimized versions on the fly for different parts of the UI.

/**
 * Build ImageKit transformation string.
 *
 * @param {{ w?: number; h?: number; q?: number; f?: string; crop?: "at_max" | "maintain_ratio" }} opts
 */
function buildTrSegment({
  w,
  h,
  q = 80,
  f = "auto",
  crop,
}) {
  const parts = [];

  if (w != null && w > 0) parts.push(`w-${Math.round(w)}`);
  if (h != null && h > 0) parts.push(`h-${Math.round(h)}`);

  if (w != null && h != null) {
    parts.push(`c-${crop ?? "at_max"}`);
  }

  parts.push(`q-${Math.min(100, Math.max(1, Math.round(q)))}`);
  parts.push(`f-${f}`);

  return `tr:${parts.join(",")}`;
}

/**
 * Returns true if this URL belongs to ImageKit.
 */
function isImageKitDeliveryUrl(url) {
  try {
    const u = new URL(url);

    if (u.hostname.endsWith("ik.imagekit.io")) return true;

    const endpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, "");

    return endpoint ? url.startsWith(endpoint) : false;
  } catch {
    return false;
  }
}

/**
 * Generates an optimized ImageKit URL.
 *
 * Non-ImageKit URLs are returned unchanged.
 *
 * @param {string | null |undefined} url
 * @param {{ w?: number; h?: number; q?: number; f?: string; crop?: "at_max" | "maintain_ratio" }} opts
 */
export function imageKitOptimizedUrl(url, opts = {}) {
  if (!url) return url ?? undefined;

  if (typeof url !== "string" || !isImageKitDeliveryUrl(url)) {
    return url;
  }

  const tr = buildTrSegment(opts);

  try {
    const u = new URL(url);

    // https://ik.imagekit.io/<id>/...
    if (u.hostname.endsWith("ik.imagekit.io")) {
      const segments = u.pathname.split("/").filter(Boolean);

      if (segments.length < 2) return url;

      const id = segments[0];
      const rest = segments.slice(1);

      while (rest.length && rest[0].startsWith("tr")) {
        rest.shift();
      }

      if (!rest.length) return url;

      u.pathname = `/${id}/${tr}/${rest.join("/")}`;

      return u.toString();
    }

    // Custom ImageKit endpoint
    const endpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, "");

    if (endpoint && url.startsWith(endpoint)) {
      const endpointUrl = new URL(endpoint);

      const basePath = endpointUrl.pathname.replace(/\/$/, "") || "";

      if (!u.pathname.startsWith(basePath)) return url;

      const relativePath = u.pathname
        .slice(basePath.length)
        .replace(/^\//, "");

      const segments = relativePath.split("/").filter(Boolean);

      while (segments.length && segments[0].startsWith("tr")) {
        segments.shift();
      }

      if (!segments.length) return url;

      u.pathname = `${basePath}/${tr}/${segments.join("/")}`;

      return u.toString();
    }

    return url;
  } catch {
    return url;
  }
}

/**
 * Image size presets used throughout the app.
 */
export const IK_PRESETS = {
  catalogCard: {
    w: 800,
    h: 600,
    q: 80,
    f: "auto",
  },

  productHero: {
    w: 1200,
    h: 1200,
    q: 82,
    f: "auto",
  },

  adminThumb: {
    w: 144,
    h: 144,
    q: 80,
    f: "auto",
  },

  cartThumb: {
    w: 192,
    h: 192,
    q: 80,
    f: "auto",
  },

  orderLineThumb: {
    w: 224,
    h: 224,
    q: 80,
    f: "auto",
  },

  orderPreviewMd: {
    w: 176,
    h: 176,
    q: 80,
    f: "auto",
  },

  orderPreviewLg: {
    w: 288,
    h: 288,
    q: 80,
    f: "auto",
  },

  formPreview: {
    w: 640,
    h: 320,
    q: 80,
    f: "auto",
  },
};