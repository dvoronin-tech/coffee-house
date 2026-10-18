import type { DeliveryData } from '#/types/delivery';

export const deliveryData: DeliveryData = {
    shipping: {
        eyebrow: 'Доставка',
        title: 'По пятницам',
        facts: [
            { label: 'Город', value: 'Минск' },
            { label: 'День развоза', value: 'пятница' },
            { label: 'Стоимость', value: 'бесплатно от 50 BYN' },
        ],
        subscriptionNote: 'У подписки доставка бесплатная и без порога.',
        scopeNote: 'За пределы Минска не возим.',
    },
    pickup: {
        eyebrow: 'Самовывоз',
        title: 'Мастерская',
        facts: [
            { label: 'Адрес', value: 'Минск, ул. Короля, 9' },
            { label: 'пн–пт', value: '8:00–20:00' },
            { label: 'сб–вс', value: '10:00–18:00' },
        ],
        phoneValue: '+375 29 123 45 67',
        phoneHref: 'tel:+375291234567',
        mapLabel: 'Как добраться',
        mapHref: 'https://yandex.by/maps/?text=Минск,%20ул.%20Короля,%209',
    },
};
