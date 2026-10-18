import { jsonb, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const interestValues = ['subscription', 'one_time', 'question'] as const;

export const interest = pgEnum('interest', interestValues);

export const records = pgTable('records', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    interest: interest('interest').notNull(),
    note: text('note'),
    analytics: jsonb('analytics'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .notNull()
        .defaultNow(),
});
