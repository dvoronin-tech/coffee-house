import { hc } from 'hono/client';
import type { AppType } from 'order-server';

export function createClient(base: string) {
    return hc<AppType>(base);
}
