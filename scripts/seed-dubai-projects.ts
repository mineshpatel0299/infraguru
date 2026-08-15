// One-off import: parses the scraped Dubai listings in dubai.md (repo root)
// and inserts them into the `projects` table, tagged location_slug='dubai',
// so they show up on /projects/location/dubai. Safe to re-run — uses
// `on conflict (slug) do nothing`.
//
// Usage: node scripts/seed-dubai-projects.ts
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

// Hand-written per-entry extras that can't be reliably auto-derived from the
// scraped text (order matches the numbered sections in dubai.md, 1-indexed).
const EXTRAS: Record<number, { tagline: string; developer: string }> = {
  1: { tagline: "Flexible studio-to-3BHK residences in Dubai Sports City.", developer: "Danube Properties" },
  2: { tagline: "Waterfront studio-to-3BR homes in Maritime City.", developer: "Danube Properties" },
  3: { tagline: "Contemporary studio-to-3BHK residences in Jumeirah Village Circle.", developer: "Danube Properties" },
  4: { tagline: "Spacious 3-4BR townhouses, villas and plots in Business Bay.", developer: "Danube Properties" },
  5: { tagline: "Studio-to-penthouse residences in Dubai Studio City.", developer: "Azizi Developments" },
  6: { tagline: "Studio-to-3BR homes in the heart of Dubai South.", developer: "Azizi Developments" },
  7: { tagline: "Studio-to-3BR residences in the prestigious Meydan district.", developer: "Azizi Developments" },
  8: { tagline: "Modern studio and 1BR apartments in Jebel Ali.", developer: "Azizi Developments" },
  9: { tagline: "Ultra-luxury residences, sky villas and penthouses in Downtown Dubai.", developer: "Arada" },
  10: { tagline: "Ultra-luxury waterfront residences in Dubai Harbour.", developer: "Arada" },
  11: { tagline: "Nature-surrounded townhouses and villas in Sharjah's Masaar community.", developer: "Arada" },
  12: { tagline: "Armani-designed ultra-luxury beachfront residences on Palm Jumeirah.", developer: "" },
  13: { tagline: "Modern 1-2BR apartments in DAMAC Hills.", developer: "DAMAC Properties" },
  14: { tagline: "Flexible office workspaces in Dubai Sports City.", developer: "Danube Properties" },
  15: { tagline: "Premium office units in DAMAC Hills.", developer: "DAMAC Properties" },
};

type ParsedEntry = {
  order: number;
  title: string;
  address: string;
  type: string;
  status: string;
  price: string;
  size: string;
  location: string;
  propertyDetails: string;
  image: string;
  viewDetailsLink: string;
  overview: string;
  amenitiesRaw: string[];
};

function field(block: string, name: string): string {
  const m = block.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.+)$`, "m"));
  return m ? m[1].trim() : "";
}

function parseDubaiMd(raw: string): ParsedEntry[] {
  const sections = raw.split(/^## /m).slice(1); // drop the H1 preamble
  return sections.map((section) => {
    const headerMatch = section.match(/^(\d+)\.\s+(.+?)\r?\n/);
    const order = headerMatch ? Number(headerMatch[1]) : 0;
    const title = headerMatch ? headerMatch[2].trim() : "";

    const overviewMatch = section.match(
      /- \*\*Overview:\*\*\s*([\s\S]*?)\n- \*\*Amenities:\*\*/
    );
    const overview = overviewMatch ? overviewMatch[1] : "";

    const amenitiesMatch = section.match(/- \*\*Amenities:\*\*\s*([\s\S]*)$/);
    const amenitiesBlock = amenitiesMatch ? amenitiesMatch[1] : "";
    const amenitiesRaw = amenitiesBlock
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("- "))
      .map((l) => l.slice(2).trim());

    return {
      order,
      title,
      address: field(section, "Address"),
      type: field(section, "Type"),
      status: field(section, "Status"),
      price: field(section, "Price"),
      size: field(section, "Size"),
      location: field(section, "Location"),
      propertyDetails: field(section, "Property Details"),
      image: field(section, "Image URL"),
      viewDetailsLink: field(section, "View Details Link"),
      overview,
      amenitiesRaw,
    };
  });
}

function overviewToParagraphs(overview: string): string[] {
  return overview
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

// Amenity lines look like "🏋️Gym" or "🛡️24*7 Security" — no space between the
// leading emoji cluster and the label. Strip the emoji codepoints (main emoji
// block + misc symbols block + variation selector) and re-join with a space,
// matching the "emoji label" convention AmenitiesEditor.tsx expects.
function formatAmenity(raw: string): string {
  const m = raw.match(/^([\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}️]+)(.*)$/u);
  if (!m) return raw;
  const [, emoji, rest] = m;
  return `${emoji} ${rest.trim()}`;
}

function slugFromLink(link: string): string {
  const trimmed = link.replace(/\/$/, "");
  return trimmed.split("/").pop() || "";
}

function buildLocation(rawLocation: string): string {
  return rawLocation.toLowerCase().includes("dubai") ? rawLocation : `${rawLocation}, Dubai`;
}

async function main() {
  const mdPath = path.join(__dirname, "..", "dubai.md");
  const raw = readFileSync(mdPath, "utf8");
  const entries = parseDubaiMd(raw);

  if (entries.length !== 15) {
    console.warn(`expected 15 entries, parsed ${entries.length} — check dubai.md format`);
  }

  if (process.argv.includes("--dry-run")) {
    for (const e of entries) {
      const extras = EXTRAS[e.order] ?? { tagline: "", developer: "" };
      const slug = slugFromLink(e.viewDetailsLink);
      const description = overviewToParagraphs(e.overview);
      const amenities = e.amenitiesRaw.map(formatAmenity);
      const location = buildLocation(e.location);
      const specs = `${e.propertyDetails} · ${e.size}`;
      console.log(JSON.stringify(
        {
          order: e.order,
          slug,
          title: e.title,
          tagline: extras.tagline,
          developer: extras.developer,
          location,
          category: e.type,
          price: e.price,
          specs,
          possession: e.status,
          image: e.image,
          descriptionParagraphs: description.length,
          description,
          amenities,
        },
        null,
        2
      ));
    }
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set");
  const url = new URL(databaseUrl);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const pool = new Pool({ connectionString: url.toString(), ssl: { rejectUnauthorized: true } });
  const client = await pool.connect();

  try {
    const maxSortRes = await client.query<{ m: number }>(
      `select coalesce(max(sort_order), -1)::int as m from projects`
    );
    let sortOrder = maxSortRes.rows[0].m + 1;

    let inserted = 0;
    let skipped = 0;

    for (const e of entries) {
      const extras = EXTRAS[e.order] ?? { tagline: "", developer: "" };
      const slug = slugFromLink(e.viewDetailsLink);
      const description = overviewToParagraphs(e.overview);
      const amenities = e.amenitiesRaw.map(formatAmenity);
      const location = buildLocation(e.location);
      const specs = `${e.propertyDetails} · ${e.size}`;
      const highlights = [
        { label: "Configuration", value: e.propertyDetails },
        { label: "Price", value: e.price },
        { label: "Size", value: e.size },
      ];

      if (!slug) {
        console.warn(`skipping "${e.title}" — no slug derived from View Details Link`);
        skipped++;
        continue;
      }

      const res = await client.query(
        `insert into projects
          (slug, code, title, tagline, location, location_slug, category, price, specs, image,
           description, highlights, amenities, gallery, architect, developer,
           possession, rera, landmarks, testimonial, status, sort_order)
         values ($1,$2,$3,$4,$5,'dubai',$6,$7,$8,$9,$10,$11,$12,'[]',$13,$14,$15,$16,'[]',null,'published',$17)
         on conflict (slug) do nothing
         returning id`,
        [
          slug,
          null, // code
          e.title,
          extras.tagline,
          location,
          e.type, // category: Residential | Commercial
          e.price,
          specs,
          e.image,
          JSON.stringify(description),
          JSON.stringify(highlights),
          JSON.stringify(amenities),
          null, // architect
          extras.developer || null,
          e.status, // possession, e.g. "New Launch"
          null, // rera
          sortOrder,
        ]
      );

      if (res.rowCount && res.rowCount > 0) {
        console.log(`  + inserted "${e.title}" (${slug}) — sort_order ${sortOrder}`);
        inserted++;
        sortOrder++;
      } else {
        console.log(`  = "${e.title}" (${slug}) already exists, skipped`);
        skipped++;
      }
    }

    console.log(`done. inserted ${inserted}, skipped ${skipped}.`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
