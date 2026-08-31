// One-off insert: adds the "Samana Business Hub" Dubai project (details
// supplied directly by the broker, not scraped) so it shows up on
// /projects/location/dubai. Safe to re-run — uses `on conflict (slug) do
// nothing`, so it never overwrites an admin's later edits.
//
// Usage: node scripts/add-samana-business-hub.ts
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

const SLUG = "samana-business-hub";
const TITLE = "Samana Business Hub";
const TAGLINE = "Commercial units on Sheikh Zayed Road, near Life Pharmacy Metro Station.";
const LOCATION = "Sheikh Zayed Road, Dubai";
const CATEGORY = "Commercial";
const PRICE = "SP AED 1,657,610.449/- (OP AED 1,950,129.94/-)";
const SPECS = "843.57 sq.ft. · 80-Month Payment Plan";
const IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80";
const DEVELOPER = "Samana Developers";
const POSSESSION = "";

const DESCRIPTION = [
  "Samana Business Hub is a commercial unit on Sheikh Zayed Road, Dubai, spanning approximately 843.57 sq.ft., offered at a special price of AED 1,657,610.449 against an original price of AED 1,950,129.94.",
  "Payment plan: 80 months.",
  "Conveniently located near the Life Pharmacy Metro Station on Sheikh Zayed Road.",
  "Contact Infraguru for floor plans, availability, pricing, or to reserve this unit.",
];

const HIGHLIGHTS = [
  { label: "Size", value: "843.57 sq.ft." },
  { label: "Original Price", value: "AED 1,950,129.94" },
  { label: "Special Price", value: "AED 1,657,610.449" },
  { label: "Payment Plan", value: "80 Months" },
];

const LANDMARKS = [{ label: "Life Pharmacy Metro Station", distance: "Nearby" }];

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
