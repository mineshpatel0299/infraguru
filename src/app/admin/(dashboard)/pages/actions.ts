"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { saveSection } from "@/lib/db/pageContent";

export async function saveSectionContentAction(
  pageSlug: string,
  sectionKey: string,
  content: unknown
): Promise<void> {
  await requireAdmin();
  await saveSection(pageSlug, sectionKey, content);
  revalidatePath("/", "layout");
}
