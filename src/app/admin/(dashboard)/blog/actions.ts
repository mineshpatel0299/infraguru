"use server";

import { requireAdmin } from "@/lib/auth";
import { createPost, deletePost, updatePost, type BlogPostInput } from "@/lib/db/blog";
import { revalidatePath } from "next/cache";

function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}

function revalidatePublicPages() {
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
}

export async function saveBlogPostAction(
  id: string | null,
  input: BlogPostInput
): Promise<{ id: string }> {
  await requireAdmin();

  if (!input.slug.trim()) throw new Error("Slug is required.");
  if (!input.title.trim()) throw new Error("Title is required.");

  try {
    const post = id ? await updatePost(id, input) : await createPost(input);
    revalidatePublicPages();
    return { id: post.id };
  } catch (err) {
    if (isUniqueViolation(err)) {
      throw new Error(`A post with the slug "${input.slug}" already exists.`);
    }
    throw err;
  }
}

export async function deleteBlogPostAction(id: string): Promise<void> {
  await requireAdmin();
  await deletePost(id);
  revalidatePublicPages();
}
