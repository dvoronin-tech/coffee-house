import { Buffer } from 'node:buffer';
import { isNonEmptyObject } from './is-non-empty-object';

const analyticsMaxUtf8Bytes = 8192;

export function storedAnalytics(
    value: unknown,
): Record<string, unknown> | null {
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
