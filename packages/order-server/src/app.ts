import { zValidator } from '@hono/zod-validator';
import { sql } from 'drizzle-orm';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db } from './db';
import { env } from './env';
import { records } from './schema';
import {
    sendOrderBody,
    sendOrderRejectionCode,
    storedAnalytics,
} from './send-order';

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
    .post(
        '/send-order',
        zValidator('json', sendOrderBody, (result, c) => {
            if (!result.success) {
                return c.json({ code: sendOrderRejectionCode(result.error) }, 400);
            }
        }),
        async (c) => {
            const body = c.req.valid('json');
            const analytics = storedAnalytics(body.analytics);
            try {
                const [saved] = await db
                    .insert(records)
                    .values({
                        id: body.id,
                        name: body.name,
                        phone: body.phone,
                        note: body.note,
                        analytics,
                    })
                    .onConflictDoUpdate({
                        target: records.id,
                        set: {
                            name: sql`excluded.name`,
                            phone: sql`excluded.phone`,
                            note: sql`excluded.note`,
                            analytics: sql`case
                                when records.analytics is null then excluded.analytics
                                else records.analytics
                            end`,
                            updatedAt: sql`now()`,
                        },
                    })
                    .returning({
                        inserted: sql<boolean>`xmax = 0`.as('inserted'),
                    });

                if (!saved) {
                    throw new Error('send-order wrote no row');
                }

                if (saved.inserted === true) {
                    return c.json({ code: 'CREATED' as const }, 200);
                }

                if (saved.inserted === false) {
                    return c.json({ code: 'UPDATED' as const }, 200);
                }

                throw new Error('send-order could not tell insert from update');
            } catch (error) {
                console.error(error);
                return c.json({ code: 'INTERNAL_SERVER_ERROR' as const }, 500);
            }
        },
    );

export type AppType = typeof app;
