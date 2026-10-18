export type GrainLot = {
    country: string;
    variety: string;
    notes: string;
    tag?: string;
    weight: string;
    price: number;
};

export type GrainData = {
    title: string;
    lead: string;
    ctaLabel: string;
    ctaHref: string;
    lots: GrainLot[];
};
