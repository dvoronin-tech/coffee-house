import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

const phone = z.string().transform((value, ctx) => {
    const parsed = parsePhoneNumberFromString(value, 'BY');
    if (!parsed?.isValid() || parsed.country !== 'BY') {
        ctx.addIssue({
            code: 'custom',
            message: 'phone',
        });
        return z.NEVER;
    }
    return parsed.number;
});

const note = z
    .string()
    .nullish()
    .transform((value) => {
        if (value == null) return null;
        const trimmed = value.trim();
        return trimmed === '' ? null : trimmed;
    });

export const sendOrderBody = z.object({
    id: z.string(),
    name: z.string().transform((value) => value.trim()),
    phone,
    note,
    analytics: z.unknown().optional(),
});
