"use server";

import { requireAdmin } from "@/lib/auth";
import {
  createProject,
  deleteProject,
  updateProject,
  type ProjectInput,
} from "@/lib/db/projects";
import { revalidatePath } from "next/cache";

function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}

function revalidatePublicPages() {
  revalidatePath("/projects");
  revalidatePath("/", "layout");
}

export async function saveProjectAction(
  id: string | null,
  input: ProjectInput
): Promise<{ id: string }> {
  await requireAdmin();

  if (!input.slug.trim()) throw new Error("Slug is required.");
  if (!input.title.trim()) throw new Error("Title is required.");

  try {
    const project = id ? await updateProject(id, input) : await createProject(input);
    revalidatePublicPages();
    return { id: project.id };
  } catch (err) {
    if (isUniqueViolation(err)) {
      throw new Error(`A project with the slug "${input.slug}" already exists.`);
    }
    throw err;
  }
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteProject(id);
  revalidatePublicPages();
}
