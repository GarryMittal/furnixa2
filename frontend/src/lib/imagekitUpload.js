import { apiFetch } from "./api.js";

const UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

export async function uploadImagesToImageKit(files, getToken, opts = {}) {
  const { productFolder, fileNames = [] } = opts;

  const uploads = files.map(async (file, index) => {
    // ImageKit's signature/token pair is single-use — fetch a fresh one
    // per file instead of sharing one across the whole batch, or every
    // upload after the first gets silently rejected.
    const auth = await apiFetch("/api/admin/imagekit/auth", { getToken });

    const safeName = fileNames[index] ?? file.name.replace(/[^\w.-]/g, "_");

    const form = new FormData();

    form.append("file", file);
    form.append("fileName", safeName);

    form.append("publicKey", auth.publicKey);
    form.append("signature", auth.signature);
    form.append("token", auth.token);
    form.append("expire", String(auth.expire));

    form.append("folder", `/Furnixa/${productFolder}`);

    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error("Image upload failed");
    }

    return {
      imageUrl: data.url,
      imageKitFileId: data.fileId,
    };
  });

  return Promise.all(uploads);
}
