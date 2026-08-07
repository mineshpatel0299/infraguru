"use server";

import { createApplication } from "@/lib/db/applications";

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export type SubmitApplicationInput = {
  jobId: string | null;
  jobTitleSnapshot: string | null;
  fullName: string;
  email: string;
  phone?: string;
  portfolioUrl?: string;
  coverNote?: string;
  resume?: File | null;
};

export async function submitApplicationAction(
  input: SubmitApplicationInput
): Promise<{ ok: true }> {
  const fullName = input.fullName?.trim();
  const email = input.email?.trim();

  if (!fullName || !email) {
    throw new Error("Name and email are required.");
  }

  let resume: { filename: string; mimeType: string; data: Buffer } | null = null;
  if (input.resume && input.resume.size > 0) {
    if (input.resume.size > MAX_RESUME_BYTES) {
      throw new Error("Resume must be under 5MB.");
    }
    if (!ALLOWED_RESUME_TYPES.has(input.resume.type)) {
      throw new Error("Resume must be a PDF or Word document.");
    }
    const buffer = Buffer.from(await input.resume.arrayBuffer());
    resume = { filename: input.resume.name, mimeType: input.resume.type, data: buffer };
  }

  await createApplication({
    jobId: input.jobId,
    jobTitleSnapshot: input.jobTitleSnapshot,
    fullName,
    email,
    phone: input.phone?.trim() || null,
    portfolioUrl: input.portfolioUrl?.trim() || null,
    coverNote: input.coverNote?.trim() || null,
    resume,
  });

  return { ok: true };
}
