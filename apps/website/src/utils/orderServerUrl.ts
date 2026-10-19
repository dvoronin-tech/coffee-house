export function orderServerUrl(): string | null {
    const base = import.meta.env.PUBLIC_ORDER_SERVER_URL;
    if (typeof base !== 'string') return null;
    const url = base.trim();
    return url === '' ? null : url;
}
