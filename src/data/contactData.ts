import type { ContactData } from '#/types/contact';

export const contactData: ContactData = {
    title: 'Остались вопросы?',
    lead: 'Оставьте контакты — перезвоним и всё расскажем.',
    addressLabel: 'Мастерская',
    address: 'Минск, ул. Короля, 9',
    hoursLabel: 'Часы',
    hours: 'пн–пт 8:00–20:00, сб–вс 10:00–18:00',
    phoneLabel: 'Телефон',
    phone: '+375 29 123 45 67',
    phoneHref: 'tel:+375291234567',
    formKicker: 'Заявка на звонок',
    fields: {
        name: {
            label: 'Имя',
            placeholder: 'Как к вам обращаться',
            error: 'Подскажите, как к вам обращаться',
        },
        phone: {
            label: 'Телефон',
            placeholder: '+375 29 123 45 67',
            hint: '+375 29 123 45 67',
            error: 'Введите номер Беларуси: +375 и 9 цифр',
        },
        email: {
            label: 'Email',
            placeholder: 'you@example.com',
            error: 'Проверьте email — нужен, чтобы продублировать детали',
        },
        comment: {
            label: 'Комментарий',
            placeholder: 'Что уточнить — по желанию',
        },
    },
    submitLabel: 'Отправить',
    submittingLabel: 'Отправляем…',
    successTitle: 'Заявка у нас',
    successText: 'Контакты получили. Перезвоним в течение дня и всё расскажем.',
    errorTitle: 'Не получилось отправить',
    errorText: 'Проверьте связь и отправьте ещё раз — или позвоните нам:',
    duplicateText: 'Заявка с этим номером уже есть. Спокойно — перезвоним.',
};
