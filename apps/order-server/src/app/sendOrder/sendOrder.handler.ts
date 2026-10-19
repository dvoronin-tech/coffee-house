import { zValidator } from '@hono/zod-validator';
import { db } from '../../db/index.js';
import { records } from '../../db/schema.js';
import { factory } from '../factory.js';
import { notifyOrder } from '../../telegram/notifyOrder.js';
import { sendOrderRejectionCode } from '../../utils/sendOrderRejection.js';
import { storedAnalytics } from '../../utils/storedAnalytics.js';
import { sendOrderBody } from './sendOrder.schema.js';
import { sql } from 'drizzle-orm';
import { ResponseCodes } from './sendOrder.constants.js';

export const sendOrderHandlers = factory.createHandlers(
    zValidator('json', sendOrderBody, (result, c) => {
        if (!result.success) {
            return c.json({ code: sendOrderRejectionCode(result.error) }, 400);
        }
    }),
    async (c) => {
        const body = c.req.valid('json');
        const analytics = storedAnalytics(body.analytics);
        try {
            const existingAnalytics = await db.query.records.findFirst({
                where: (record, { eq }) => eq(record.id, body.id),
                columns: {
                    analytics: true,
                },
            });

            const [data] = await db
                .insert(records)
                .values({
                    id: body.id,
                    name: body.name,
                    phone: body.phone,
                    interest: body.interest,
                    note: body.note,
                    analytics,
                })
                .onConflictDoUpdate({
                    target: records.id,
                    set: {
                        name: body.name,
                        phone: body.phone,
                        interest: body.interest,
                        note: body.note,
                        updatedAt: sql`now()`,
                        ...(existingAnalytics == null ? { analytics } : {}),
                    },
                })
                .returning({
                    inserted: sql<boolean>`${records.createdAt} = ${records.updatedAt}`,
                });

            if (!data) return c.json({ code: ResponseCodes.error.internal });

            if (data.inserted) {
                try {
                    await notifyOrder({
                        id: body.id,
                        name: body.name,
                        phone: body.phone,
                        note: body.note,
                    });
                } catch (error) {
                    console.error(error);
                }
                return c.json({ code: ResponseCodes.success.created }, 200);
            }

            return c.json({ code: ResponseCodes.success.updated }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ code: ResponseCodes.error.internal }, 500);
        }
    },
);
