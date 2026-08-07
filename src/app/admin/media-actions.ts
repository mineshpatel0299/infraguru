"use server";

import { requireAdmin } from "@/lib/auth";
import { saveMedia } from "@/lib/db/media";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export async function uploadMediaAction(file: File): Promise<{ id: string; url: string }> {
  await requireAdmin();

  if (!file || file.size === 0) {
    throw new Error("No file provided.");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only JPEG, PNG, WEBP, AVIF or GIF images are allowed.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return saveMedia({ filename: file.name, mimeType: file.type, data: buffer });
}
