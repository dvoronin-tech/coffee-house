import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';
import { interestValues } from '../../db/schema';

function boundedString(
    field: 'id' | 'name',
    maxLength: number,
    options?: { trim?: boolean },
) {
    return z.string().transform((value, ctx) => {
        const text = options?.trim ? value.trim() : value;
        if (text.length < 1 || text.length > maxLength) {
            ctx.addIssue({
                code: 'custom',
                message: field,
            });
            return z.NEVER;
        }
        return text;
    });
}

const id = boundedString('id', 128);
const name = boundedString('name', 200, { trim: true });

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

const interest = z.enum(interestValues);

const note = z
    .string()
    .nullish()
    .transform((value, ctx) => {
        if (value == null) return null;
        const trimmed = value.trim();
        if (trimmed.length > 2000) {
            ctx.addIssue({
                code: 'custom',
                message: 'note',
            });
            return z.NEVER;
        }
        return trimmed === '' ? null : trimmed;
    });

export const sendOrderBody = z
    .object({
        id,
        name,
        phone,
        interest,
        note,
        analytics: z.unknown().optional(),
    })
    .strip();
