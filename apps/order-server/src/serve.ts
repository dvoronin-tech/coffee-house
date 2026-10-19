import { serve } from '@hono/node-server';
import { app } from './app.js';
import { env } from './utils/env.js';

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    console.log(`listening on ${info.port}`);
});
