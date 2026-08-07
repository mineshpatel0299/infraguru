import { db } from "./client";
import type { ApplicationStatus, JobApplication } from "./types";

type ApplicationRow = {
  id: string;
  job_id: string | null;
  job_title_snapshot: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  portfolio_url: string | null;
  cover_note: string | null;
  resume_filename: string | null;
  resume_mime_type: string | null;
  has_resume: boolean;
  status: string;
  created_at: string;
};

function mapRow(row: ApplicationRow): JobApplication {
  return {
    id: row.id,
    jobId: row.job_id,
    jobTitleSnapshot: row.job_title_snapshot,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    portfolioUrl: row.portfolio_url,
    coverNote: row.cover_note,
    resumeFilename: row.resume_filename,
    resumeMimeType: row.resume_mime_type,
    hasResume: row.has_resume,
    status: row.status as ApplicationStatus,
    createdAt: row.created_at,
  };
}

const SELECT_COLUMNS = `
  id, job_id, job_title_snapshot, full_name, email, phone, portfolio_url,
  cover_note, resume_filename, resume_mime_type, (resume_data is not null) as has_resume,
  status, created_at
`;

export type ApplicationInput = {
  jobId: string | null;
  jobTitleSnapshot: string | null;
  fullName: string;
  email: string;
  phone?: string | null;
  portfolioUrl?: string | null;
  coverNote?: string | null;
  resume?: { filename: string; mimeType: string; data: Buffer } | null;
};

export async function listApplications(filters?: {
  jobId?: string;
  status?: ApplicationStatus;
}): Promise<JobApplication[]> {
  const conditions: string[] = [];
  const params: unknown[] = [];
  if (filters?.jobId) {
    params.push(filters.jobId);
    conditions.push(`job_id = $${params.length}`);
  }
  if (filters?.status) {
    params.push(filters.status);
    conditions.push(`status = $${params.length}`);
  }
  const where = conditions.length ? `where ${conditions.join(" and ")}` : "";
  const res = await db.query<ApplicationRow>(
    `select ${SELECT_COLUMNS} from job_applications ${where} order by created_at desc`,
    params
  );
  return res.rows.map(mapRow);
}

export async function getApplicationById(id: string): Promise<JobApplication | null> {
  const res = await db.query<ApplicationRow>(
    `select ${SELECT_COLUMNS} from job_applications where id = $1`,
    [id]
  );
  return res.rows[0] ? mapRow(res.rows[0]) : null;
}

export async function getApplicationResume(
  id: string
): Promise<{ filename: string; mimeType: string; data: Buffer } | null> {
  const res = await db.query<{
    resume_filename: string | null;
    resume_mime_type: string | null;
    resume_data: Buffer | null;
  }>(
    `select resume_filename, resume_mime_type, resume_data from job_applications where id = $1`,
    [id]
  );
  const row = res.rows[0];
  if (!row || !row.resume_data || !row.resume_filename || !row.resume_mime_type) return null;
  return { filename: row.resume_filename, mimeType: row.resume_mime_type, data: row.resume_data };
}

export async function createApplication(input: ApplicationInput): Promise<JobApplication> {
  const res = await db.query<ApplicationRow>(
    `insert into job_applications
      (job_id, job_title_snapshot, full_name, email, phone, portfolio_url, cover_note,
       resume_filename, resume_mime_type, resume_data, status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'new')
     returning ${SELECT_COLUMNS}`,
    [
      input.jobId,
      input.jobTitleSnapshot,
      input.fullName,
      input.email,
      input.phone ?? null,
      input.portfolioUrl ?? null,
      input.coverNote ?? null,
      input.resume?.filename ?? null,
      input.resume?.mimeType ?? null,
      input.resume?.data ?? null,
    ]
  );
  return mapRow(res.rows[0]);
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<JobApplication> {
  const res = await db.query<ApplicationRow>(
    `update job_applications set status = $2 where id = $1 returning ${SELECT_COLUMNS}`,
    [id, status]
  );
  if (!res.rows[0]) throw new Error("Application not found");
  return mapRow(res.rows[0]);
}

export async function deleteApplication(id: string): Promise<void> {
  await db.query(`delete from job_applications where id = $1`, [id]);
}

export async function countApplicationsByStatus(): Promise<Record<string, number>> {
  const res = await db.query<{ status: string; count: string }>(
    `select status, count(*)::text as count from job_applications group by status`
  );
  const out: Record<string, number> = {};
  for (const row of res.rows) out[row.status] = Number(row.count);
  return out;
}
