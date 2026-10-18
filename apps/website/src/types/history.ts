export type HistoryFact = {
    label: string;
    value: string;
};

export type HistoryData = {
    title: string;
    lead: string;
    cardName: string;
    cardText: string;
    facts: readonly HistoryFact[];
    imageAlt: string;
    backgroundAlt: string;
};
