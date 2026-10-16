import type { SubscriptionData } from '#/types/subscription';

export const subscriptionData: SubscriptionData = {
	title: 'Две пачки раз в месяц',
	facts: [
		{ value: '2 пачки', detail: 'по 250 г' },
		{ value: '54 BYN', detail: 'в месяц' },
		{ value: 'Доставка по Минску', detail: 'бесплатно' },
	],
	ctaLabel: 'Оформить подписку',
	ctaHref: '#contact-form',
	note: 'Это заявка: списаний и оплат на сайте нет.',
};