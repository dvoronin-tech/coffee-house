import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import routes from './app/routes';
import { env } from './utils/env';

export const app = new Hono()
    .use(
        '*',
        cors({
            origin: (origin) => {
                const allowed = env.WEB_ORIGIN;
                if (allowed && origin === allowed) return allowed;
                return undefined;
            },
        }),
    )
    .route('/api', routes);

export type { AppType } from './app/routes';

app.onError((error, c) => {
    if (isMalformedJson(error)) {
        return c.json({ code: 'INVALID_ID' as const }, 400);
    }
    if (error instanceof HTTPException) {
        const response = error.getResponse();
        return c.newResponse(response.body, response);
    }
    console.error(error);
    return c.json({ code: 'INTERNAL_SERVER_ERROR' as const }, 500);
});

export default app;

function isMalformedJson(error: Error): boolean {
    return (
        error instanceof HTTPException &&
        error.status === 400 &&
        error.message === 'Malformed JSON in request body'
    );
}
