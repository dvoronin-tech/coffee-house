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
        },
        phone: {
            label: 'Телефон',
            placeholder: '+375 29 123 45 67',
        },
        interest: {
            label: 'Что интересует',
            placeholder: 'Что интересует',
            options: [
                { value: 'subscription', label: 'Подписка' },
                { value: 'one_time', label: 'Разовый заказ' },
                { value: 'question', label: 'Вопрос' },
            ],
        },
        comment: {
            label: 'Комментарий',
            placeholder: 'Что уточнить — по желанию',
        },
    },
    createLabel: 'Создать заявку',
    updateLabel: 'Обновить заявку',
    submittingLabel: 'Отправляем…',
    countdown: 'Новую заявку можно создать через {time}',
    messages: {
        emptyName: 'Укажите имя',
        emptyPhone: 'Укажите телефон',
        emptyInterest: 'Выберите, что интересует',
        invalidName: 'Имя слишком длинное',
        invalidPhone: 'Проверьте номер телефона',
        invalidNote: 'Комментарий слишком длинный',
        network: 'Проверьте связь и отправьте ещё раз.',
        failed: 'Не получилось отправить. Отправьте ещё раз.',
        created: 'Заявка отправлена',
        updated: 'Заявка обновлена',
    },
};
