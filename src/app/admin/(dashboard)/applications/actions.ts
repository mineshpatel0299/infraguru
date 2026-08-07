"use server";

import { requireAdmin } from "@/lib/auth";
import {
  deleteApplication,
  updateApplicationStatus,
} from "@/lib/db/applications";
import type { ApplicationStatus } from "@/lib/db/types";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatusAction(
  id: string,
  status: ApplicationStatus
): Promise<void> {
  await requireAdmin();
  await updateApplicationStatus(id, status);
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
}

export async function deleteApplicationAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteApplication(id);
  revalidatePath("/admin/applications");
}
