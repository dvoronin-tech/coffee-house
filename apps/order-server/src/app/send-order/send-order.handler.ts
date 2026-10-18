import { zValidator } from '@hono/zod-validator';
import { db } from '../../db';
import { records } from '../../db/schema';
import { factory } from '../factory';
import { sendOrderRejectionCode } from '../../utils/send-order-rejection';
import { storedAnalytics } from '../../utils/stored-analytics';
import { sendOrderBody } from './send-order.schema';
import { sql } from 'drizzle-orm';
import { ResponseCodes } from './send-order.constants';

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
                    note: body.note,
                    analytics,
                })
                .onConflictDoUpdate({
                    target: records.id,
                    set: {
                        name: body.name,
                        phone: body.phone,
                        note: body.note,
                        updatedAt: sql`now()`,
                        ...(existingAnalytics == null ? { analytics } : {}),
                    },
                })
                .returning({
                    createdAt: records.createdAt,
                    updatedAt: records.updatedAt,
                });

            if (!data) return c.json({ code: ResponseCodes.error.internal });

            const action =
                data.createdAt === data.updatedAt ? 'insert' : 'update';

            if (action === 'insert')
                return c.json({ code: ResponseCodes.success.created, }, 200);
            if (action === 'update')
                return c.json({ code: ResponseCodes.success.updated, }, 200);

            return c.json({ code: ResponseCodes.error.internal });
        } catch (error) {
            console.error(error);
            return c.json({ code: ResponseCodes.error.internal }, 500);
        }
    },
);
