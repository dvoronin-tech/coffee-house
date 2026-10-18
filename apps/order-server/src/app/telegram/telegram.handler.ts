import { timingSafeEqual } from 'node:crypto';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { telegramSubscribers } from '../../db/schema';
import { callTelegram } from '../../telegram/botApi';
import { env } from '../../utils/env';
import { factory } from '../factory';
import { CallbackAction, TelegramText } from './telegram.constants';
import { telegramUpdateBody } from './telegram.schema';

function webhookSecretMatches(header: string | undefined): boolean {
    if (header == null) return false;
    const provided = Buffer.from(header);
    const expected = Buffer.from(env.TELEGRAM_WEBHOOK_SECRET);
    if (provided.length !== expected.length) return false;
    return timingSafeEqual(provided, expected);
}

function subscriptionKeyboard() {
    return {
        inline_keyboard: [
            [
                {
                    text: TelegramText.subscribeButton,
                    callback_data: CallbackAction.subscribe,
                },
                {
                    text: TelegramText.unsubscribeButton,
                    callback_data: CallbackAction.unsubscribe,
                },
            ],
        ],
    };
}

export const telegramHandlers = factory.createHandlers(
    async (c, next) => {
        if (
            !webhookSecretMatches(
                c.req.header('X-Telegram-Bot-Api-Secret-Token'),
            )
        ) {
            return c.json({ code: 'UNAUTHORIZED' }, 401);
        }
        await next();
    },
    zValidator('json', telegramUpdateBody, (result, c) => {
        if (!result.success) return c.body(null, 200);
    }),
    async (c) => {
        const body = c.req.valid('json');
        const callback = body.callback_query;
        const callbackChatId = callback?.message?.chat.id;
        if (callback && callbackChatId != null) {
            const chatId = String(callbackChatId);
            if (callback.data === CallbackAction.subscribe) {
                await db
                    .insert(telegramSubscribers)
                    .values({ chatId })
                    .onConflictDoNothing();
                await callTelegram('answerCallbackQuery', {
                    callback_query_id: callback.id,
                    text: TelegramText.subscribed,
                });
            }
            if (callback.data === CallbackAction.unsubscribe) {
                await db
                    .delete(telegramSubscribers)
                    .where(eq(telegramSubscribers.chatId, chatId));
                await callTelegram('answerCallbackQuery', {
                    callback_query_id: callback.id,
                    text: TelegramText.unsubscribed,
                });
            }
            return c.body(null, 200);
        }

        const message = body.message;
        if (message?.text?.startsWith('/start')) {
            await callTelegram('sendMessage', {
                chat_id: String(message.chat.id),
                text: TelegramText.start,
                reply_markup: subscriptionKeyboard(),
            });
        }

        return c.body(null, 200);
    },
);
