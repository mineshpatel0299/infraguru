import { db } from "./client";
import type { Highlight, Landmark, Project, ProjectStatus, Testimonial } from "./types";

type ProjectRow = {
  id: string;
  slug: string;
  code: string | null;
  title: string;
  tagline: string | null;
  location: string | null;
  location_slug: string | null;
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
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  og_image: string | null;
  seo_noindex: boolean;
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
    locationSlug: row.location_slug ?? "",
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
    seoTitle: row.seo_title ?? "",
    seoDescription: row.seo_description ?? "",
    seoKeywords: row.seo_keywords ?? [],
    ogImage: row.og_image ?? "",
    seoNoindex: row.seo_noindex,
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
  locationSlug?: string | null;
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
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords: string[];
  ogImage?: string | null;
  seoNoindex: boolean;
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
      (slug, code, title, tagline, location, location_slug, category, price, specs, image,
       description, highlights, amenities, gallery, architect, developer,
       possession, rera, landmarks, testimonial, status, featured, sort_order,
       seo_title, seo_description, seo_keywords, og_image, seo_noindex)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,
             $24,$25,$26,$27,$28)
     returning *`,
    [
      input.slug,
      input.code ?? null,
      input.title,
      input.tagline ?? null,
      input.location ?? null,
      input.locationSlug || null,
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
      input.seoTitle ?? null,
      input.seoDescription ?? null,
      JSON.stringify(input.seoKeywords),
      input.ogImage ?? null,
      input.seoNoindex,
    ]
  );
  return mapRow(res.rows[0]);
}

export async function updateProject(id: string, input: ProjectInput): Promise<Project> {
  const res = await db.query<ProjectRow>(
    `update projects set
      slug = $2, code = $3, title = $4, tagline = $5, location = $6, location_slug = $7,
      category = $8, price = $9, specs = $10, image = $11, description = $12, highlights = $13,
      amenities = $14, gallery = $15, architect = $16, developer = $17,
      possession = $18, rera = $19, landmarks = $20, testimonial = $21,
      status = $22, featured = $23, sort_order = $24,
      seo_title = $25, seo_description = $26, seo_keywords = $27, og_image = $28,
      seo_noindex = $29, updated_at = now()
     where id = $1
     returning *`,
    [
      id,
      input.slug,
      input.code ?? null,
      input.title,
      input.tagline ?? null,
      input.location ?? null,
      input.locationSlug || null,
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
      input.seoTitle ?? null,
      input.seoDescription ?? null,
      JSON.stringify(input.seoKeywords),
      input.ogImage ?? null,
      input.seoNoindex,
    ]
  );
  if (!res.rows[0]) throw new Error("Project not found");
  return mapRow(res.rows[0]);
}

export async function deleteProject(id: string): Promise<void> {
  await db.query(`delete from projects where id = $1`, [id]);
}
