import type { GrainData } from '#/types/grain';

export const grainData: GrainData = {
	title: 'Три зерна',
	lead: 'Свежая обжарка, 250 г. Цену называем прямо.',
	ctaLabel: 'Заказать',
	ctaHref: '#contact-form',
	lots: [
		{
			country: 'Эфиопия',
			variety: 'Иргачеффе',
			notes: 'цветочный, бергамот',
			tag: 'светлая обжарка',
			weight: '250 г',
			price: 32,
		},
		{
			country: 'Колумбия',
			variety: 'Уила',
			notes: 'карамель, красное яблоко',
			weight: '250 г',
			price: 29,
		},
		{
			country: 'Бразилия',
			variety: 'Серрадо',
			notes: 'орех, шоколад',
			tag: 'под эспрессо',
			weight: '250 г',
			price: 26,
		},
	],
};