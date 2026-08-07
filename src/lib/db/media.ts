import { db } from "./client";

export type StoredMedia = {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  data: Buffer;
};

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB — generous for CMS photography, keeps the DB row sane.

export async function saveMedia(file: {
  filename: string;
  mimeType: string;
  data: Buffer;
}): Promise<{ id: string; url: string }> {
  if (file.data.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("File is too large (max 8MB)");
  }
  const res = await db.query<{ id: string }>(
    `insert into media (filename, mime_type, size_bytes, data) values ($1,$2,$3,$4) returning id`,
    [file.filename, file.mimeType, file.data.byteLength, file.data]
  );
  const id = res.rows[0].id;
  return { id, url: `/api/media/${id}` };
}

export async function getMedia(id: string): Promise<StoredMedia | null> {
  const res = await db.query<{
    id: string;
    filename: string;
    mime_type: string;
    size_bytes: number;
    data: Buffer;
  }>(`select id, filename, mime_type, size_bytes, data from media where id = $1`, [id]);
  const row = res.rows[0];
  if (!row) return null;
  return {
    id: row.id,
    filename: row.filename,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    data: row.data,
  };
}

export async function deleteMedia(id: string): Promise<void> {
  await db.query(`delete from media where id = $1`, [id]);
}
