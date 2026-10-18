import { Pool } from 'pg';

export function requireDatabaseUrl(): string {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is required');
    }
    return databaseUrl;
}

export function createPool(connectionString: string): Pool {
    return new Pool({ connectionString });
}
