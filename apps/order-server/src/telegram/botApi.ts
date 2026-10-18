import { env } from '../utils/env';

const TELEGRAM_TIMEOUT_MS = 5000;

function withoutToken(text: string): string {
    return text.replaceAll(env.TELEGRAM_BOT_TOKEN, '[redacted]');
}

export async function callTelegram(
    method: string,
    body: Record<string, unknown>,
): Promise<void> {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`;
    let response: Response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
        });
    } catch (error) {
        const name = error instanceof Error ? error.name : 'Error';
        throw new Error(`Telegram ${method} failed: ${name}`);
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
            `Telegram ${method} failed: ${response.status} ${withoutToken(description)}`,
        );
    }
}
