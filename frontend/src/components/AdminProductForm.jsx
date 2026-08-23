import { useState } from "react";
import { XIcon } from "lucide-react";
import { uploadImagesToImageKit } from "../lib/imagekitUpload.js";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-amber-800 focus:outline-none focus:ring-1 focus:ring-amber-800 disabled:bg-neutral-50 disabled:text-neutral-400";
const labelClass = "text-sm font-medium text-neutral-700";

export function AdminProductForm({
  initial,
  saving,
  error,
  getToken,
  onCancel,
  onSubmit,
}) {
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "General");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [priceCents, setPriceCents] = useState(
    initial ? String(initial.priceCents / 100) : "",
  );
  const [currency, setCurrency] = useState(initial?.currency ?? "usd");
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(initial?.active ?? true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const dollars = Number.parseFloat(priceCents);
    if (Number.isNaN(dollars) || dollars <= 0) return;

    const body = {
      slug: slug.trim(),
      name: name.trim(),
      category: category.trim() || "General",
      description: description.trim(),
      priceCents: Math.round(dollars * 100),
      currency: currency.trim().toLowerCase(),
      active,
      images,
    };

    if (initial) {
      const patch = {};

      if (body.name !== initial.name) patch.name = body.name;
      if (body.category !== (initial.category ?? "General"))
        patch.category = body.category;
      if (body.description !== initial.description)
        patch.description = body.description;
      if (body.priceCents !== initial.priceCents)
        patch.priceCents = body.priceCents;
      if (body.currency !== initial.currency) patch.currency = body.currency;
      if (body.active !== initial.active) patch.active = body.active;

      if (Object.keys(patch).length === 0) {
        onCancel();
        return;
      }

      onSubmit(patch);
    } else {
      onSubmit(body);
    }
  }

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";

    if (!files.length) return;

    if (!slug.trim()) {
      setUploadError("Please enter product slug first.");
      return;
    }

    setUploadError(null);
    setUploadingImage(true);

    try {
      const uploaded = await uploadImagesToImageKit(files, getToken, {
        productFolder: slug.trim(),
      });

      // Append instead of replace, so uploading in multiple rounds
      // accumulates rather than wiping out the previous batch.
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Slug</span>
        <input
          className={inputClass}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          disabled={Boolean(initial)}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className={labelClass}>Name</span>
        <input
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className={labelClass}>Category</span>
        <input
          className={inputClass}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Bedroom, Living Room"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className={labelClass}>Description</span>
        <textarea
          className={`${inputClass} h-24 resize-none`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1">
          <span className={labelClass}>Price (USD)</span>
          <input
            className={inputClass}
            type="number"
            step="0.01"
            min="0.01"
            value={priceCents}
            onChange={(e) => setPriceCents(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className={labelClass}>Currency</span>
          <input
            className={inputClass}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </label>
      </div>

      {!initial && (
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Product images</span>

          <label className="flex w-fit cursor-pointer flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50">
              {uploadingImage ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
              ) : null}
              {uploadingImage ? "Uploading…" : "Upload to ImageKit"}
            </span>

            <span className="text-xs text-neutral-400">
              PNG, JPG, WebP, GIF · max 10MB · multiple allowed
            </span>

            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              disabled={uploadingImage || saving}
              onChange={handleImageUpload}
            />
          </label>

          {uploadError && (
            <span className="text-xs text-red-500">{uploadError}</span>
          )}

          {images.length > 0 && (
            <div className="mt-1">
              <p className="mb-2 text-sm text-green-600">
                {images.length} image{images.length > 1 ? "s" : ""} uploaded
                {images.length > 1 ? " · first is primary" : ""}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                  <div
                    key={img.imageKitFileId ?? index}
                    className="group relative"
                  >
                    <img
                      src={imageKitOptimizedUrl(
                        img.imageUrl,
                        IK_PRESETS.formPreview,
                      )}
                      alt=""
                      className="h-24 w-full rounded-lg border border-neutral-200 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-950/70 text-white opacity-0 transition group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <XIcon className="size-3.5" aria-hidden />
                    </button>
                    {index === 0 ? (
                      <span className="absolute bottom-1 left-1 rounded bg-amber-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        Primary
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          className="size-4 rounded border-neutral-300 accent-amber-800"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <span className={labelClass}>Active in store</span>
      </label>

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          Save failed (check slug is unique &amp; required fields are filled).
        </div>
      ) : null}

      <div className="mt-2 flex justify-end gap-3 border-t border-neutral-100 pt-4">
        <button
          type="button"
          className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
          disabled={saving || uploadingImage}
        >
          {saving ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : null}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
