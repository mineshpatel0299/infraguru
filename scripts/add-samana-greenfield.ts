// One-off insert: adds the "Samana Greenfield" Dubai project (details
// supplied directly by the broker, not scraped) so it shows up on
// /projects/location/dubai. Safe to re-run — uses `on conflict (slug) do
// nothing`, so it never overwrites an admin's later edits.
//
// Usage: node scripts/add-samana-greenfield.ts
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

const SLUG = "samana-greenfield";
const TITLE = "Samana Greenfield";
const TAGLINE = "1-bedroom convertible residences in Warsan 4, next to the Blue Line Metro.";
const LOCATION = "Warsan 4, Dubai";
const CATEGORY = "Residential";
const PRICE = "994,000 AED after discount (OP 1,169,411 AED)";
const SPECS = "1BR Convertible · 568 sq.ft.";
const IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80";
const DEVELOPER = "Samana Developers";
const POSSESSION = "Q2 2029";

const DESCRIPTION = [
  "Samana Greenfield is a 1-bedroom convertible residence in Warsan 4, Dubai, originally priced at AED 1,169,411 and now available at a discounted AED 994,000, with a unit size of approximately 568 sq.ft. and handover targeted for Q2 2029.",
  "Payment plan: a 60:40 post-handover structure with a 15% down payment.",
  "Ideally located next to the Blue Line Metro, with Dubai Silicon Oasis and Academic City just 5 minutes away.",
  "Contact Infraguru for floor plans, availability, pricing, or to reserve this unit.",
];

const HIGHLIGHTS = [
  { label: "Configuration", value: "1-Bedroom Convertible Unit" },
  { label: "Handover", value: POSSESSION },
  { label: "Payment Plan", value: "60:40 Post Handover · 15% DP" },
];

const LANDMARKS = [
  { label: "Blue Line Metro", distance: "Adjacent" },
  { label: "Silicon Oasis & Academic City", distance: "5 mins" },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL not set");

  const url = new URL(connectionString);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const pool = new Pool({ connectionString: url.toString(), ssl: { rejectUnauthorized: true } });

  const maxSortRes = await pool.query<{ m: number }>(
    `select coalesce(max(sort_order), -1)::int as m from projects`
  );
  const sortOrder = maxSortRes.rows[0].m + 1;

  const res = await pool.query(
    `insert into projects
      (slug, code, title, tagline, location, location_slug, category, price, specs, image,
       description, highlights, amenities, gallery, architect, developer,
       possession, rera, landmarks, testimonial, status, sort_order)
     values ($1,null,$2,$3,$4,'dubai',$5,$6,$7,$8,$9,$10,'[]','[]',null,$11,$12,null,$13,null,'published',$14)
     on conflict (slug) do nothing
     returning id`,
    [
      SLUG,
      TITLE,
      TAGLINE,
      LOCATION,
      CATEGORY,
      PRICE,
      SPECS,
      IMAGE,
      JSON.stringify(DESCRIPTION),
      JSON.stringify(HIGHLIGHTS),
      DEVELOPER,
      POSSESSION,
      JSON.stringify(LANDMARKS),
      sortOrder,
    ]
  );

  if (res.rowCount) {
    console.log(`Inserted "${TITLE}" (${SLUG}) — sort_order ${sortOrder}`);
  } else {
    console.log(`"${SLUG}" already exists — left untouched`);
  }

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
