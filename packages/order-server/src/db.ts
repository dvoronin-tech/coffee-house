import { drizzle } from 'drizzle-orm/node-postgres';
import { createPool, requireDatabaseUrl } from './pool';
import * as schema from './schema';

const pool = createPool(requireDatabaseUrl());

export const db = drizzle(pool, { schema });
