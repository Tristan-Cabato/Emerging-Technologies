import { Pool, PoolClient, QueryResultRow, QueryResult } from 'pg';

const globalForPool = global as unknown as { pool: Pool };
// From env.local
const DB_HOST="aws-1-ap-northeast-1.pooler.supabase.com";
const DB_PORT=5432;
const DB_USER="postgres.cxfeiqpcxczeogparwhc";
const DB_PASSWORD="touhoumygoat";
const DB_NAME="postgres";
const DATABASE_URL="postgresql://postgres:touhoumygoat@db.cxfeiqpcxczeogparwhc.supabase.co:5432/postgres";

export const pool = globalForPool.pool || new Pool({
  connectionString: DATABASE_URL,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

if (process.env.NODE_ENV !== 'production') globalForPool.pool = pool;

// ----------------------------
// Reusable query function
// Using 'unknown' or a generic T instead of 'any'
// ----------------------------
export const query = <T extends QueryResultRow = QueryResultRow>(
  text: string, 
  params?: unknown[]
): Promise<QueryResult<T>> => pool.query<T>(text, params);

// ----------------------------
// Optional helper: get a client for transactions
// ----------------------------
export const getClient = async () => {
  const client = await pool.connect();
  return {
    client,
    release: () => client.release(),
    query: <T extends QueryResultRow = QueryResultRow>(
        text: string, 
        params?: unknown[]
    ) => client.query<T>(text, params),
  };
};

// ----------------------------
// Optional helper: simple transaction wrapper
// ----------------------------
export const transaction = async <T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};