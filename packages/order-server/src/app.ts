import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db } from './db';
import { env } from './env';
import { records } from './schema';
import { sendOrderBody } from './send-order';

export const app = new Hono()
    .use(
        '*',
        cors({
            origin: (origin) => {
                const allowed = env('WEB_ORIGIN');
                if (allowed && origin === allowed) return allowed;
                return undefined;
            },
        }),
    )
    .post('/send-order', zValidator('json', sendOrderBody), async (c) => {
        const body = c.req.valid('json');
        try {
            await db.insert(records).values({
                id: body.id,
                name: body.name,
                phone: body.phone,
                note: body.note,
            });
            return c.json({ code: 'CREATED' as const }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ code: 'INTERNAL_SERVER_ERROR' as const }, 500);
        }
    });

export type AppType = typeof app;
