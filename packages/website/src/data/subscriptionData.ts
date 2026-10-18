import type { SubscriptionData } from '#/types/subscription';

export const subscriptionData: SubscriptionData = {
	title: 'Две пачки раз в месяц',
	price: { amount: '54', currency: 'BYN', period: 'в месяц' },
	facts: [
		{ value: '2 пачки', detail: 'по 250 г' },
		{ value: 'Доставка по Минску', detail: 'бесплатно' },
	],
	ctaLabel: 'Оформить подписку',
	ctaHref: '#contact-form',
	note: 'Это заявка: списаний и оплат на сайте нет.',
};