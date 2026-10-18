import { z } from 'zod';

const chat = z.object({
    id: z.number(),
});

export const telegramUpdateBody = z
    .object({
        message: z
            .object({
                text: z.string().optional(),
                chat,
            })
            .optional(),
        callback_query: z
            .object({
                id: z.string(),
                data: z.string().optional(),
                message: z
                    .object({
                        chat,
                    })
                    .optional(),
            })
            .optional(),
    })
    .strip();
