// One-off setup script: creates the CMS schema on Neon, seeds the admin
// account, and (only on an empty table) imports the existing static
// projects/jobs so nothing gets lost when the CMS becomes the source of truth.
//
// Usage: node scripts/migrate.ts
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { PROJECTS } from "../src/lib/projects.ts";
import { OPENINGS } from "../src/lib/careers.ts";
import { BLOG_POSTS } from "../src/lib/blog.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set");

  const url = new URL(databaseUrl);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const pool = new Pool({ connectionString: url.toString(), ssl: { rejectUnauthorized: true } });
  const client = await pool.connect();

  try {
    console.log("→ applying schema...");
    const schemaSql = readFileSync(
      path.join(__dirname, "..", "src", "lib", "db", "schema.sql"),
      "utf8"
    );
    await client.query(schemaSql);

    console.log("→ seeding admin user...");
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || "Admin";
    if (email && password) {
      const existing = await client.query(
        "select id from admin_users where email = $1",
        [email]
      );
      if (existing.rowCount === 0) {
        const hash = await bcrypt.hash(password, 12);
        await client.query(
          "insert into admin_users (email, password_hash, name) values ($1, $2, $3)",
          [email, hash, name]
        );
        console.log(`  created admin user ${email}`);
      } else {
        console.log(`  admin user ${email} already exists, skipping`);
      }
    }

    console.log("→ checking projects table...");
    const projectCount = await client.query("select count(*)::int as c from projects");
    if (projectCount.rows[0].c === 0) {
      console.log(`  seeding ${PROJECTS.length} projects from static data...`);
      for (const [i, p] of PROJECTS.entries()) {
        await client.query(
          `insert into projects
            (slug, code, title, tagline, location, category, price, specs, image,
             description, highlights, amenities, gallery, architect, developer,
             possession, rera, landmarks, testimonial, status, featured, sort_order)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,'published',false,$20)
           on conflict (slug) do nothing`,
          [
            p.slug,
            p.code,
            p.title,
            p.tagline,
            p.location,
            p.category,
            p.price,
            p.specs,
            p.image,
            JSON.stringify(p.description),
            JSON.stringify(p.highlights),
            JSON.stringify(p.amenities),
            JSON.stringify(p.gallery),
            p.architect,
            p.developer,
            p.possession,
            p.rera,
            JSON.stringify(p.landmarks),
            JSON.stringify(p.testimonial),
            i,
          ]
        );
      }
    } else {
      console.log(`  projects table already has ${projectCount.rows[0].c} rows, skipping seed`);
    }

    console.log("→ checking job_openings table...");
    const jobCount = await client.query("select count(*)::int as c from job_openings");
    if (jobCount.rows[0].c === 0) {
      console.log(`  seeding ${OPENINGS.length} job openings from static data...`);
      for (const [i, j] of OPENINGS.entries()) {
        await client.query(
          `insert into job_openings
            (slug, title, department, location, address, work_mode, requirements,
             overview, responsibilities, qualifications, why_join, status, sort_order)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'open',$12)
           on conflict (slug) do nothing`,
          [
            j.slug || slugify(j.title),
            j.title,
            j.department,
            j.location,
            j.address ?? null,
            j.workMode,
            JSON.stringify(j.requirements),
            j.overview,
            JSON.stringify(j.responsibilities),
            JSON.stringify(j.qualifications),
            JSON.stringify(j.whyJoin),
            i,
          ]
        );
      }
    } else {
      console.log(`  job_openings table already has ${jobCount.rows[0].c} rows, skipping seed`);
    }

    console.log("→ checking blog_posts table...");
    const blogCount = await client.query("select count(*)::int as c from blog_posts");
    if (blogCount.rows[0].c === 0) {
      console.log(`  seeding ${BLOG_POSTS.length} blog posts from static data...`);
      for (const p of BLOG_POSTS) {
        await client.query(
          `insert into blog_posts
            (slug, title, excerpt, category, post_date, read_time, cover_image,
             author_name, author_role, author_avatar, content, status)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'published')
           on conflict (slug) do nothing`,
          [
            p.slug,
            p.title,
            p.excerpt,
            p.category,
            p.date,
            p.readTime,
            p.coverImage,
            p.author.name,
            p.author.role,
            p.author.avatar,
            JSON.stringify(p.content),
          ]
        );
      }
    } else {
      console.log(`  blog_posts table already has ${blogCount.rows[0].c} rows, skipping seed`);
    }

    console.log("done.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
