export type SubscriptionFact = {
    value: string;
    detail: string;
};

export type SubscriptionPrice = {
    amount: string;
    currency: string;
    period: string;
};

export type SubscriptionData = {
    title: string;
    price: SubscriptionPrice;
    facts: readonly SubscriptionFact[];
    ctaLabel: string;
    ctaHref: string;
    note: string;
};
