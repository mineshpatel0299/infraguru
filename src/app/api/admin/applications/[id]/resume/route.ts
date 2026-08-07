import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getApplicationResume } from "@/lib/db/applications";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const resume = await getApplicationResume(id);

  if (!resume) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(resume.data), {
    headers: {
      "Content-Type": resume.mimeType,
      "Content-Disposition": `attachment; filename="${resume.filename.replace(/"/g, "")}"`,
    },
  });
}
