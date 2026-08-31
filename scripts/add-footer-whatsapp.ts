// One-off fix: the live footer's `socials` array (page_slug='global',
// section_key='footer') is missing the WhatsApp entry present in
// FOOTER_DEFAULT_CONTENT — presumably dropped by an earlier content edit —
// which is why the WhatsApp icon doesn't render (Footer.tsx has no icon
// for a missing entry, it simply isn't in the list). This appends it back
// without touching whatever else an admin has since edited (LinkedIn,
// Instagram, X, hrefs, tagline, etc.). Safe to re-run — no-ops if WhatsApp
// is already present.
//
// Usage: node scripts/add-footer-whatsapp.ts
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

const WHATSAPP_ENTRY = { label: "WhatsApp", href: "https://wa.me/919090656575" };

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL not set");

  const url = new URL(connectionString);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const pool = new Pool({ connectionString: url.toString(), ssl: { rejectUnauthorized: true }, connectionTimeoutMillis: 15000 });

  const res = await pool.query<{ content: { socials?: { label: string; href: string }[] } }>(
    `select content from page_sections where page_slug = 'global' and section_key = 'footer'`
  );

  if (!res.rows[0]) {
    console.log("no saved footer content row — the page is using FOOTER_DEFAULT_CONTENT, which already includes WhatsApp. Nothing to do.");
    await pool.end();
    return;
  }

  const socials = res.rows[0].content.socials ?? [];
  if (socials.some((s) => s.label === "WhatsApp")) {
    console.log("WhatsApp is already present in the saved footer content — left untouched.");
    await pool.end();
    return;
  }

  const nextSocials = [...socials, WHATSAPP_ENTRY];
  await pool.query(
    `update page_sections
     set content = jsonb_set(content, '{socials}', $1::jsonb), updated_at = now()
     where page_slug = 'global' and section_key = 'footer'`,
    [JSON.stringify(nextSocials)]
  );

  console.log("Added WhatsApp to the footer socials:", nextSocials);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
