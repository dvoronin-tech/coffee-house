import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../utils/env.js';
import { createPool } from './pool.js';
import * as schema from './schema.js';

const pool = createPool(env.DATABASE_URL);

export const db = drizzle(pool, { schema });
