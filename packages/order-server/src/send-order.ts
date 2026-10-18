import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

const id = z.string().transform((value, ctx) => {
    if (value.length < 1 || value.length > 128) {
        ctx.addIssue({
            code: 'custom',
            message: 'id',
        });
        return z.NEVER;
    }
    return value;
});

const name = z.string().transform((value, ctx) => {
    const trimmed = value.trim();
    if (trimmed.length < 1 || trimmed.length > 200) {
        ctx.addIssue({
            code: 'custom',
            message: 'name',
        });
        return z.NEVER;
    }
    return trimmed;
});

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
        note,
        analytics: z.unknown().optional(),
    })
    .strip();

const rejectionCodeByField = {
    id: 'INVALID_ID',
    name: 'INVALID_NAME',
    phone: 'INVALID_PHONE_NUMBER',
    note: 'INVALID_NOTE',
} as const;

const rejectionFieldOrder = ['id', 'name', 'phone', 'note'] as const;

export type SendOrderRejectionCode =
    (typeof rejectionCodeByField)[keyof typeof rejectionCodeByField];

export function sendOrderRejectionCode(error: {
    issues: readonly { path?: readonly PropertyKey[] }[];
}): SendOrderRejectionCode {
    for (const field of rejectionFieldOrder) {
        if (error.issues.some((issue) => issue.path?.[0] === field)) {
            return rejectionCodeByField[field];
        }
    }
    return rejectionCodeByField.id;
}
