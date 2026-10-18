import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const telegramSubscribers = pgTable('telegram_subscribers', {
    chatId: text('chat_id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .notNull()
        .defaultNow(),
});

export const records = pgTable('records', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    note: text('note'),
    analytics: jsonb('analytics'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .notNull()
        .defaultNow(),
});
