import type { HeaderData } from '../types/header';

export const headerData: HeaderData = {
	logoLabel: 'Кварта',
	logoHref: '#top',
	links: [
		{ label: 'Зерно', href: '#grain' },
		{ label: 'Доставка', href: '#delivery' },
		{ label: 'Подписка', href: '#subscribe' },
	],
	cta: { label: 'Заявка', href: '#contact-form' },
	activeMark: 'dandy',
	marks: [
		{ id: 'word', name: 'Слово', note: 'Только антиква' },
		{ id: 'dandy', name: 'Денди', note: 'К и зёрнышко' },
		{ id: 'seal', name: 'Печать', note: 'Четверть круга' },
	],
};
