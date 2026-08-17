import { Pool, type QueryResult } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __infraguruPool: Pool | undefined;
}

// pg-connection-string emits a process warning whenever it parses
// `sslmode=` out of the URL (it's an alias-deprecation notice, not an
// error) — Next's dev overlay then surfaces that warning as if it were a
// thrown error. Strip the ssl-related query params and configure SSL
// explicitly instead, so the warning path is never hit.
function toPoolConfig(connectionString: string) {
  const url = new URL(connectionString);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  return { connectionString: url.toString(), ssl: { rejectUnauthorized: true } };
}

let warnedMissingUrl = false;

/** Returns null (instead of throwing) when DATABASE_URL isn't set yet, so
 * the site stays browsable — with empty/default CMS content — before the
 * database is configured. */
export function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    if (!warnedMissingUrl) {
      console.warn("[db] DATABASE_URL is not set — pages will render with empty/default content until it's configured.");
      warnedMissingUrl = true;
    }
    return null;
  }
  if (!global.__infraguruPool) {
    global.__infraguruPool = new Pool({ ...toPoolConfig(connectionString), max: 5 });
  }
  return global.__infraguruPool;
}

export const db = {
  query: async <T extends Record<string, unknown> = Record<string, unknown>>(
    text: string,
    params?: unknown[]
  ): Promise<QueryResult<T>> => {
    const pool = getPool();
    if (!pool) {
      return { rows: [], rowCount: 0 } as unknown as QueryResult<T>;
    }
    return pool.query<T>(text, params);
  },
};
