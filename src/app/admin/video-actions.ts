"use server";

import { requireAdmin } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

const ALLOWED_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // 100MB — matches Vercel's function request body limit.

export async function uploadVideoAction(file: File): Promise<{ url: string }> {
  await requireAdmin();

  if (!file || file.size === 0) {
    throw new Error("No file provided.");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only MP4, WEBM or MOV videos are allowed.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Video is too large (max 100MB).");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { url } = await uploadToCloudinary(buffer, file.name, "video");
  return { url };
}
