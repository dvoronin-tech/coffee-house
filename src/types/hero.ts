export type HeroLink = {
    label: string;
    href: string;
    tone: 'primary' | 'secondary';
};

export type HeroMeta = {
    label: string;
    value: string;
};

export type HeroData = {
    title: string;
    lead: string;
    text: string;
    links: readonly HeroLink[];
    meta: readonly HeroMeta[];
    imageAlt: string;
    slogan: string;
};
