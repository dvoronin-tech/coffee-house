import type { LeadInterest } from '#/types/contact';
import { createClient } from './client';

export type OrderBody = {
    id: string;
    name: string;
    phone: string;
    interest: LeadInterest;
    note?: string;
};

export function order(body: OrderBody) {
    return createClient().api['send-order'].$post({ json: body });
}
