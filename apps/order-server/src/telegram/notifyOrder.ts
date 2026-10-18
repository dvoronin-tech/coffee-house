import { env } from '../utils/env';

const TELEGRAM_TIMEOUT_MS = 5000;

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

function withoutToken(text: string): string {
    return text.replaceAll(env.TELEGRAM_BOT_TOKEN, '[redacted]');
}

export async function notifyOrder(order: OrderNotification): Promise<void> {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    let response: Response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                chat_id: env.TELEGRAM_CHAT_ID,
                text: orderMessage(order),
            }),
            signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
        });
    } catch (error) {
        const name = error instanceof Error ? error.name : 'Error';
        throw new Error(`Telegram sendMessage failed: ${name}`);
    }

    const raw = await response.text();
    let accepted = response.ok;
    let description = raw;
    try {
        const payload = JSON.parse(raw) as {
            ok?: boolean;
            description?: string;
        };
        if (payload.ok === false) accepted = false;
        if (typeof payload.description === 'string') {
            description = payload.description;
        }
    } catch {
        accepted = false;
    }

    if (!accepted) {
        throw new Error(
            `Telegram sendMessage failed: ${response.status} ${withoutToken(description)}`,
        );
    }
}
