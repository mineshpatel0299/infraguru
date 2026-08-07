"use server";

import { requireAdmin, hashPassword, verifyPassword } from "@/lib/auth";
import { getAdminByEmail, updateAdminPassword } from "@/lib/db/admin";

export type ChangePasswordState = { error?: string; success?: boolean } | undefined;

export async function changePasswordAction(
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const admin = await requireAdmin();

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Fill in all fields." };
  }
  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "New passwords don't match." };
  }

  const full = await getAdminByEmail(admin.email);
  if (!full || !(await verifyPassword(currentPassword, full.passwordHash))) {
    return { error: "Current password is incorrect." };
  }

  const hash = await hashPassword(newPassword);
  await updateAdminPassword(admin.id, hash);

  return { success: true };
}
