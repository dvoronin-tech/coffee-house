import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './env';

if (!env('DATABASE_URL')) {
    throw new Error('DATABASE_URL is required');
}

if (!env('WEB_ORIGIN')) {
    throw new Error('WEB_ORIGIN is required');
}

const port = listenPort(env('PORT'));

serve({ fetch: app.fetch, port }, (info) => {
    console.log(`listening on ${info.port}`);
});

function listenPort(raw: string | undefined): number {
    if (raw == null || raw === '') return 3000;
    const value = Number(raw);
    if (!Number.isInteger(value) || value < 1 || value > 65535) {
        throw new Error('PORT must be an integer from 1 to 65535');
    }
    return value;
}
