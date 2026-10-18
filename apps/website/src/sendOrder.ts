import { hc } from 'hono/client';
import type { AppType } from 'order-server';
import type { LeadInterest } from '#/types/contact';

export type { AppType };

export type SendOrderBody = {
    id: string;
    name: string;
    phone: string;
    interest: LeadInterest;
    note?: string;
};

export function sendOrder(base: string, body: SendOrderBody) {
    return hc<AppType>(base).api['send-order'].$post({ json: body });
}
