// One-off fix: sets the footer's `socials` array (page_slug='global',
// section_key='footer') to the requested final state — LinkedIn,
// Facebook, Instagram, and WhatsApp (X dropped). Overwrites the whole
// array (order matters here), unlike add-footer-whatsapp.ts which only
// appended.
//
// Usage: node scripts/fix-footer-socials.ts
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

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

const SOCIALS = [
  { label: "LinkedIn", href: "http://linkedin.com/company/infragurugurgaon/?viewAsMember=true" },
  { label: "Facebook", href: "https://www.facebook.com/infraguruluxury" },
  { label: "Instagram", href: "https://www.instagram.com/infra_guru/reels/" },
  { label: "WhatsApp", href: "https://wa.me/919090656575" },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL not set");

  const url = new URL(connectionString);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const pool = new Pool({ connectionString: url.toString(), ssl: { rejectUnauthorized: true }, connectionTimeoutMillis: 15000 });

  const res = await pool.query(
    `update page_sections
     set content = jsonb_set(content, '{socials}', $1::jsonb), updated_at = now()
     where page_slug = 'global' and section_key = 'footer'
     returning content->'socials' as socials`,
    [JSON.stringify(SOCIALS)]
  );

  if (!res.rows[0]) {
    console.log("no saved footer content row found — nothing updated.");
  } else {
    console.log("Footer socials now:", JSON.stringify(res.rows[0].socials, null, 2));
  }

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
