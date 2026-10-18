import type { FreshnessData } from '#/types/freshness';

export const freshnessData: FreshnessData = {
	title: 'Зерно у вас на 1–3 день после обжарки',
	lead: 'Зерно не лежит на полке — от обжарки до вашей чашки проходит 1–3 дня, вкус и аромат на пике.',
	steps: [
		{ index: '01', name: 'Обжарка', when: 'сегодня', accent: false },
		{
			index: '02',
			name: 'Доставка',
			when: 'в течение пары дней',
			accent: false,
		},
		{ index: '03', name: 'У вас', when: 'на 1–3 день', accent: true },
	],
};
