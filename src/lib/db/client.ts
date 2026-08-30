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
  return {
    connectionString: url.toString(),
    ssl: { rejectUnauthorized: true },
    // Neon's serverless compute suspends after a period of idleness and
    // takes a moment to resume on the next connection — without this the
    // OS-level TCP timeout is used instead, which can hang far longer than
    // is useful before finally failing.
    connectionTimeoutMillis: 10_000,
  };
}

/** True for connection-level failures (DNS/network blips, a Neon compute
 * that's still waking up from idle) — worth a quick retry on a fresh
 * connection. False for anything that reached the database and failed
 * there (bad SQL, constraint violations, etc.), which a retry can't fix. */
function isTransientConnectionError(err: unknown): boolean {
  if (typeof AggregateError !== "undefined" && err instanceof AggregateError) return true;
  const code = (err as { code?: string } | undefined)?.code;
  return code === "ETIMEDOUT" || code === "ECONNREFUSED" || code === "ENETUNREACH" || code === "ECONNRESET";
}

const RETRY_DELAYS_MS = [300, 1500];

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

    for (let attempt = 0; ; attempt++) {
      try {
        return await pool.query<T>(text, params);
      } catch (err) {
        if (attempt >= RETRY_DELAYS_MS.length || !isTransientConnectionError(err)) throw err;
        console.warn(`[db] transient connection error, retrying (attempt ${attempt + 1}/${RETRY_DELAYS_MS.length})…`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt]));
      }
    }
  },
};
