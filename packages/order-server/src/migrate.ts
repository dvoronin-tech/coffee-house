import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { env } from './env';

const databaseUrl = env('DATABASE_URL');
if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
}

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle(pool);
const migrationsFolder = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../drizzle',
);

await migrate(db, { migrationsFolder });
await pool.end();
