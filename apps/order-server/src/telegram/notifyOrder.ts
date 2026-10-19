import { db } from '../db/index.js';
import { telegramSubscribers } from '../db/schema.js';
import { callTelegram } from './botApi.js';

export type OrderNotification = {
    id: string;
    name: string;
    phone: string;
    note: string | null;
};

function orderMessage(order: OrderNotification): string {
    const lines = [
        'Новая заявка',
        `id: ${order.id}`,
        `Имя: ${order.name}`,
        `Телефон: ${order.phone}`,
    ];
    if (order.note) lines.push(`Комментарий: ${order.note}`);
    return lines.join('\n');
}

export async function notifyOrder(order: OrderNotification): Promise<void> {
    const subscribers = await db
        .select({ chatId: telegramSubscribers.chatId })
        .from(telegramSubscribers);
    const text = orderMessage(order);

    for (const subscriber of subscribers) {
        try {
            await callTelegram('sendMessage', {
                chat_id: subscriber.chatId,
                text,
            });
        } catch (error) {
            console.error(error);
        }
    }
}
