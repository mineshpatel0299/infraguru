import { Pool } from "pg";

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

export function getPool(): Pool {
  if (!global.__infraguruPool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    global.__infraguruPool = new Pool({ ...toPoolConfig(connectionString), max: 5 });
  }
  return global.__infraguruPool;
}

export const db = {
  query: <T extends Record<string, unknown> = Record<string, unknown>>(
    text: string,
    params?: unknown[]
  ) => getPool().query<T>(text, params),
};
