import { hc } from 'hono/client';
import type { AppType } from 'order-server';
import { orderServerUrl } from '#/utils/orderServerUrl';

export function createClient() {
    const base = orderServerUrl();
    if (!base) {
        throw new Error('PUBLIC_ORDER_SERVER_URL is not set');
    }

    return hc<AppType>(base);
}
