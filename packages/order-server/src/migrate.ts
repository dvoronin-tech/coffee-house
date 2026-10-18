import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { createPool, requireDatabaseUrl } from './pool';

const pool = createPool(requireDatabaseUrl());
const db = drizzle(pool);
const migrationsFolder = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../drizzle',
);

await migrate(db, { migrationsFolder });
await pool.end();
