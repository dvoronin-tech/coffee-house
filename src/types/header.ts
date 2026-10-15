export type HeaderMarkId = 'word' | 'dandy' | 'seal';

export type HeaderLink = {
	label: string;
	href: string;
};

export type HeaderMark = {
	id: HeaderMarkId;
	name: string;
	note: string;
};

export type HeaderData = {
	logoLabel: string;
	logoHref: string;
	links: readonly HeaderLink[];
	cta: HeaderLink;
	activeMark: HeaderMarkId;
	marks: readonly HeaderMark[];
};
