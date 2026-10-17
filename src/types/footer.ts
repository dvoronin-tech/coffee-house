export type FooterLink = {
    label: string;
    href: string;
};

export type FooterData = {
    logoLabel: string;
    logoHref: string;
    tagline: string;
    title: string;
    links: readonly FooterLink[];
    cta: FooterLink;
    ctaNote: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hours: string;
    phoneLabel: string;
    phone: string;
    phoneHref: string;
    note: string;
};