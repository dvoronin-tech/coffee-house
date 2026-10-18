import { Buffer } from 'node:buffer';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

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

const analyticsMaxUtf8Bytes = 8192;

export function storedAnalytics(value: unknown): Record<string, unknown> | null {
    if (!isNonEmptyObject(value)) return null;

    try {
        const encoded = JSON.stringify(value);
        if (typeof encoded !== 'string') return null;
        if (Buffer.byteLength(encoded, 'utf8') > analyticsMaxUtf8Bytes) {
            return null;
        }
    } catch {
        return null;
    }

    return value;
}

function isNonEmptyObject(value: unknown): value is Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }
    return Object.keys(value).length > 0;
}

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
