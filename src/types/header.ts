export type HeaderLink = {
	label: string;
	href: string;
};

export type HeaderData = {
	logoLabel: string;
	logoHref: string;
	links: readonly HeaderLink[];
	cta: HeaderLink;
};
