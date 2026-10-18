import type { FooterData } from '#/types/footer';

export const footerData: FooterData = {
    logoLabel: 'Кварта',
    logoHref: '#top',
    tagline:
        'Мастерская в Минске. Зерно оказывается у вас на 1–3 день после обжарки.',
    title: 'Оставьте контакты — перезвоним и всё расскажем',
    links: [
        { label: 'Зерно', href: '#grain' },
        { label: 'Доставка', href: '#delivery' },
        { label: 'Подписка', href: '#subscribe' },
        { label: 'Мастерская', href: '#workshop' },
    ],
    cta: { label: 'Оставить заявку', href: '#contact-form' },
    ctaNote: 'Перезвоним в течение дня и всё расскажем.',
    addressLabel: 'Адрес',
    address: 'Минск, ул. Короля, 9',
    hoursLabel: 'Часы работы',
    hours: 'пн–пт 8:00–20:00, сб–вс 10:00–18:00',
    phoneLabel: 'Телефон',
    phone: '+375 29 123 45 67',
    phoneHref: 'tel:+375291234567',
    note: '© 2026 Кварта — мастерская обжарки в Минске',
};
