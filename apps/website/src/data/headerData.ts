import type { HeaderData } from '#/types/header';

export const headerData: HeaderData = {
    logoLabel: 'Кварта',
    logoHref: '#',
    links: [
        { label: 'Зерно', href: '#grain' },
        { label: 'Доставка', href: '#delivery' },
        { label: 'Подписка', href: '#subscribe' },
    ],
    cta: { label: 'Заявка', href: '#contact-form' },
};
