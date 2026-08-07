import { db } from "./client";
import type { AdminUser } from "./types";

type AdminRow = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
};

export async function getAdminByEmail(
  email: string
): Promise<(AdminUser & { passwordHash: string }) | null> {
  const res = await db.query<AdminRow>(`select * from admin_users where email = $1`, [
    email.toLowerCase().trim(),
  ]);
  const row = res.rows[0];
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
    passwordHash: row.password_hash,
  };
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  const res = await db.query<AdminRow>(`select * from admin_users where id = $1`, [id]);
  const row = res.rows[0];
  if (!row) return null;
  return { id: row.id, email: row.email, name: row.name, createdAt: row.created_at };
}

export async function updateAdminPassword(id: string, passwordHash: string): Promise<void> {
  await db.query(`update admin_users set password_hash = $2 where id = $1`, [id, passwordHash]);
}
