export type FreshnessStep = {
    index: string;
    name: string;
    when: string;
    accent: boolean;
};

export type FreshnessData = {
    title: string;
    lead: string;
    steps: FreshnessStep[];
};
