import type { HeroData } from '../types/hero';

export const heroData: HeroData = {
    title: 'Кварта',
    lead: 'Зерно оказывается у вас на 1–3 день после обжарки.',
    text: 'Мастерская в Минске. Жарим небольшими партиями и отдаём зерно, пока оно свежее.',
    links: [
        { label: 'Выбрать зерно', href: '#grain', tone: 'primary' },
        { label: 'Подписка', href: '#subscribe', tone: 'secondary' },
    ],
    meta: [
        { label: 'Город', value: 'Минск' },
        { label: 'Мастерская', value: 'с 2019' },
        { label: 'Партии', value: 'по 5 кг' },
        { label: 'Обжарка', value: 'по четвергам' },
    ],
    imageAlt: 'Рука держит совок с кофейным зерном',
    slogan: 'Свежая обжарка',
};
