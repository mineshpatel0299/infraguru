import { db } from "./client";
import type { Highlight, Landmark, Project, ProjectStatus, Testimonial } from "./types";

type ProjectRow = {
  id: string;
  slug: string;
  code: string | null;
  title: string;
  tagline: string | null;
  location: string | null;
  category: string;
  price: string | null;
  specs: string | null;
  image: string | null;
  description: string[] | null;
  highlights: Highlight[] | null;
  amenities: string[] | null;
  gallery: string[] | null;
  architect: string | null;
  developer: string | null;
  possession: string | null;
  rera: string | null;
  landmarks: Landmark[] | null;
  testimonial: Testimonial | null;
  status: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function mapRow(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    code: row.code ?? "",
    title: row.title,
    tagline: row.tagline ?? "",
    location: row.location ?? "",
    category: row.category,
    price: row.price ?? "",
    specs: row.specs ?? "",
    image: row.image ?? "",
    description: row.description ?? [],
    highlights: row.highlights ?? [],
    amenities: row.amenities ?? [],
    gallery: row.gallery ?? [],
    architect: row.architect ?? "",
    developer: row.developer ?? "",
    possession: row.possession ?? "",
    rera: row.rera ?? "",
    landmarks: row.landmarks ?? [],
    testimonial: row.testimonial,
    status: row.status as ProjectStatus,
    featured: row.featured,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type ProjectInput = {
  slug: string;
  code?: string | null;
  title: string;
  tagline?: string | null;
  location?: string | null;
  category: string;
  price?: string | null;
  specs?: string | null;
  image?: string | null;
  description: string[];
  highlights: Highlight[];
  amenities: string[];
  gallery: string[];
  architect?: string | null;
  developer?: string | null;
  possession?: string | null;
  rera?: string | null;
  landmarks: Landmark[];
  testimonial: Testimonial | null;
  status: ProjectStatus;
  featured: boolean;
  sortOrder: number;
};

export async function listAllProjects(): Promise<Project[]> {
  const res = await db.query<ProjectRow>(
    `select * from projects order by sort_order asc, created_at desc`
  );
  return res.rows.map(mapRow);
}

export async function listPublishedProjects(): Promise<Project[]> {
  const res = await db.query<ProjectRow>(
    `select * from projects where status = 'published' order by sort_order asc, created_at desc`
  );
  return res.rows.map(mapRow);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const res = await db.query<ProjectRow>(`select * from projects where id = $1`, [id]);
  return res.rows[0] ? mapRow(res.rows[0]) : null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await db.query<ProjectRow>(`select * from projects where slug = $1`, [slug]);
  return res.rows[0] ? mapRow(res.rows[0]) : null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const res = await db.query<ProjectRow>(
    `insert into projects
      (slug, code, title, tagline, location, category, price, specs, image,
       description, highlights, amenities, gallery, architect, developer,
       possession, rera, landmarks, testimonial, status, featured, sort_order)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
     returning *`,
    [
      input.slug,
      input.code ?? null,
      input.title,
      input.tagline ?? null,
      input.location ?? null,
      input.category,
      input.price ?? null,
      input.specs ?? null,
      input.image ?? null,
      JSON.stringify(input.description),
      JSON.stringify(input.highlights),
      JSON.stringify(input.amenities),
      JSON.stringify(input.gallery),
      input.architect ?? null,
      input.developer ?? null,
      input.possession ?? null,
      input.rera ?? null,
      JSON.stringify(input.landmarks),
      input.testimonial ? JSON.stringify(input.testimonial) : null,
      input.status,
      input.featured,
      input.sortOrder,
    ]
  );
  return mapRow(res.rows[0]);
}

export async function updateProject(id: string, input: ProjectInput): Promise<Project> {
  const res = await db.query<ProjectRow>(
    `update projects set
      slug = $2, code = $3, title = $4, tagline = $5, location = $6, category = $7,
      price = $8, specs = $9, image = $10, description = $11, highlights = $12,
      amenities = $13, gallery = $14, architect = $15, developer = $16,
      possession = $17, rera = $18, landmarks = $19, testimonial = $20,
      status = $21, featured = $22, sort_order = $23, updated_at = now()
     where id = $1
     returning *`,
    [
      id,
      input.slug,
      input.code ?? null,
      input.title,
      input.tagline ?? null,
      input.location ?? null,
      input.category,
      input.price ?? null,
      input.specs ?? null,
      input.image ?? null,
      JSON.stringify(input.description),
      JSON.stringify(input.highlights),
      JSON.stringify(input.amenities),
      JSON.stringify(input.gallery),
      input.architect ?? null,
      input.developer ?? null,
      input.possession ?? null,
      input.rera ?? null,
      JSON.stringify(input.landmarks),
      input.testimonial ? JSON.stringify(input.testimonial) : null,
      input.status,
      input.featured,
      input.sortOrder,
    ]
  );
  if (!res.rows[0]) throw new Error("Project not found");
  return mapRow(res.rows[0]);
}

export async function deleteProject(id: string): Promise<void> {
  await db.query(`delete from projects where id = $1`, [id]);
}
