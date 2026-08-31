// One-off insert: adds the "Samana South Haven" Dubai pre-launch project
// (details supplied directly by the broker, not scraped) so it shows up on
// /projects/location/dubai. Safe to re-run — uses `on conflict (slug) do
// nothing`, so it never overwrites an admin's later edits.
//
// Usage: node scripts/add-samana-south-haven.ts
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

const SLUG = "samana-south-haven";
const TITLE = "Samana South Haven";
const TAGLINE = "Premium low-rise studios, 1 & 2-bedroom residences launching this month.";
const LOCATION = "Dubai";
const CATEGORY = "Residential";
const PRICE = "Starting from AED 650,000";
const SPECS = "Studio – 2BR Apartments · 400–1,100 sq.ft.";
const IMAGE = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80";
const DEVELOPER = "Samana Developers";
const POSSESSION = "Q2 2029";

const DESCRIPTION = [
  "Samana South Haven is a premium low-rise residential development in Dubai, offering exceptional value and attractive payment options ahead of its official launch at the end of this month, with completion targeted for Q2 2029.",
  "The development comprises G + 6 residential floors with a total of 200 units, including 54 studios (approx. 400 sq.ft.), 140 one-bedroom apartments (approx. 600–650 sq.ft.), and 6 two-bedroom apartments (approx. 1,100 sq.ft.). The ground floor houses 200 dedicated parking spaces, and each typical floor plate spans approximately 19,700 sq.ft., laid out with 10 studios, 23 one-bedroom apartments and 1 two-bedroom apartment.",
  "Starting prices begin from AED 650,000 for a studio, AED 950,000 for a one-bedroom apartment, and AED 1.25 million for a two-bedroom apartment. Exclusive launch benefits include up to a 15% launch discount, plus an additional 30% discount on full cash purchases.",
  "Two payment plan options are available at launch. Option 1 (PDC): 10% down payment, 5% in the 4th month, 10% in the 12th month, and 1% monthly for 75 months. Option 2 (Non-PDC): 15% down payment, 5% in the 4th month, 10% in the 12th month, and 1% monthly for 70 months. Please note: no 2% DLD waiver and no 5% post-handover payment plan are available — only the two payment plans above apply to this launch.",
  "Inventory is limited, with only 6 two-bedroom units available across the entire project. Contact Infraguru for floor plans, availability, pricing, or to reserve your preferred unit before the official launch.",
];

const HIGHLIGHTS = [
  { label: "Configuration", value: "G + 6 Residential Floors" },
  { label: "Total Units", value: "200 (54 Studio · 140 1BR · 6 2BR)" },
  { label: "Completion", value: POSSESSION },
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
     values ($1,null,$2,$3,$4,'dubai',$5,$6,$7,$8,$9,$10,'[]','[]',null,$11,$12,null,'[]',null,'published',$13)
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
