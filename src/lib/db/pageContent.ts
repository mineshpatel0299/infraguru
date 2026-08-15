import { db } from "./client";

export type SectionKey = { pageSlug: string; key: string };

function mapKey(pageSlug: string, sectionKey: string): string {
  return `${pageSlug}:${sectionKey}`;
}

/** Batch fetch a set of (pageSlug, sectionKey) rows, keyed by "pageSlug:sectionKey". */
export async function getSections(keys: SectionKey[]): Promise<Map<string, unknown>> {
  const result = new Map<string, unknown>();
  if (keys.length === 0) return result;

  const pageSlugs = [...new Set(keys.map((k) => k.pageSlug))];
  const res = await db.query<{ page_slug: string; section_key: string; content: unknown }>(
    `select page_slug, section_key, content from page_sections where page_slug = any($1)`,
    [pageSlugs]
  );
  for (const row of res.rows) {
    result.set(mapKey(row.page_slug, row.section_key), row.content);
  }
  return result;
}

export async function getSection(pageSlug: string, sectionKey: string): Promise<unknown | null> {
  const res = await db.query<{ content: unknown }>(
    `select content from page_sections where page_slug = $1 and section_key = $2`,
    [pageSlug, sectionKey]
  );
  return res.rows[0]?.content ?? null;
}

export async function saveSection(
  pageSlug: string,
  sectionKey: string,
  content: unknown
): Promise<void> {
  await db.query(
    `insert into page_sections (page_slug, section_key, content)
     values ($1, $2, $3)
     on conflict (page_slug, section_key)
     do update set content = excluded.content, updated_at = now()`,
    [pageSlug, sectionKey, JSON.stringify(content)]
  );
}
