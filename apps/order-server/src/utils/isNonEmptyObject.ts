export function isNonEmptyObject(
    value: unknown,
): value is Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }
    return Object.keys(value).length > 0;
}
