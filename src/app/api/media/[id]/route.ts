import { NextResponse } from "next/server";
import { getMedia } from "@/lib/db/media";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const media = await getMedia(id);

  if (!media) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(media.sizeBytes),
    },
  });
}
