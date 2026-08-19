// One-off seed: inserts the default content for the About page's new
// "Vision & Mission" section (about:visionMission) so it shows up already
// populated in the CMS admin instead of relying purely on the code fallback.
// Safe to re-run — uses `on conflict do nothing`, so it never overwrites a
// row an admin has since edited.
//
// Usage: node scripts/seed-about-vision-mission.ts
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

const ABOUT_VISION_MISSION_DEFAULT_CONTENT = {
  eyebrow: "Our Compass",
  headingPlain1: "Guided by",
  headingHighlight: "Purpose,",
  headingPlain2: "Not Just Property",
  vision: {
    title: "Our Vision",
    description:
      "To be India's most trusted real estate advisory — where every address we curate becomes a benchmark for quality, integrity, and lasting value, for generations to come.",
  },
  mission: {
    title: "Our Mission",
    description:
      "To guide every client — from first-time buyers to institutional investors — through real estate decisions with uncompromising transparency, deep market intelligence, and a standard of service that earns trust for life.",
  },
};

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL not set");

  const url = new URL(connectionString);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const pool = new Pool({ connectionString: url.toString(), ssl: { rejectUnauthorized: true } });

  const res = await pool.query(
    `insert into page_sections (page_slug, section_key, content)
     values ($1, $2, $3)
     on conflict (page_slug, section_key) do nothing
     returning page_slug, section_key`,
    ["about", "visionMission", JSON.stringify(ABOUT_VISION_MISSION_DEFAULT_CONTENT)]
  );

  if (res.rowCount) {
    console.log("Seeded about:visionMission");
  } else {
    console.log("about:visionMission already exists — left untouched");
  }

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
