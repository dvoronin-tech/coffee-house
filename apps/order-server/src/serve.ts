import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './utils/env';

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    console.log(`listening on ${info.port}`);
});
