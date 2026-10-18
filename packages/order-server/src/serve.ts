import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './utils/constants';

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    console.log(`listening on ${info.port}`);
});
