"use server";

import { requireAdmin } from "@/lib/auth";
import { createJob, deleteJob, updateJob, type JobInput } from "@/lib/db/jobs";
import { revalidatePath } from "next/cache";

function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}

function revalidatePublicPages() {
  revalidatePath("/careers");
  revalidatePath("/careers/apply/[slug]", "page");
}

export async function saveJobAction(id: string | null, input: JobInput): Promise<{ id: string }> {
  await requireAdmin();

  if (!input.slug.trim()) throw new Error("Slug is required.");
  if (!input.title.trim()) throw new Error("Title is required.");
  if (!input.department.trim()) throw new Error("Department is required.");

  try {
    const job = id ? await updateJob(id, input) : await createJob(input);
    revalidatePublicPages();
    return { id: job.id };
  } catch (err) {
    if (isUniqueViolation(err)) {
      throw new Error(`A job with the slug "${input.slug}" already exists.`);
    }
    throw err;
  }
}

export async function deleteJobAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteJob(id);
  revalidatePublicPages();
}
