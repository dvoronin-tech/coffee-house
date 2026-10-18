import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../utils/constants';
import { createPool } from './pool';
import * as schema from './schema';

const pool = createPool(env.DATABASE_URL);

export const db = drizzle(pool, { schema });
