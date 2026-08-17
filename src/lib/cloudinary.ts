import crypto from "node:crypto";

// Signed uploads straight to Cloudinary's REST API (no SDK dependency).
// Credentials are read lazily so the app can boot before they're set —
// uploads just fail with a clear message until CLOUDINARY_* env vars exist.
function getConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret };
}

export function isCloudinaryConfigured(): boolean {
  return getConfig() !== null;
}

export async function uploadToCloudinary(
  data: Buffer,
  filename: string,
  resourceType: "image" | "video"
): Promise<{ url: string; publicId: string }> {
  const config = getConfig();
  if (!config) {
    throw new Error(
      "Cloudinary isn't configured yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to the environment."
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "infraguru/gallery";
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + config.apiSecret)
    .digest("hex");

  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(data)]), filename);
  form.append("api_key", config.apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`Cloudinary upload failed: ${message}`);
  }

  const json = (await res.json()) as { secure_url: string; public_id: string };
  return { url: json.secure_url, publicId: json.public_id };
}
