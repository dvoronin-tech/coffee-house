export type SubscriptionFact = {
	value: string;
	detail: string;
};

export type SubscriptionData = {
	title: string;
	facts: readonly SubscriptionFact[];
	ctaLabel: string;
	ctaHref: string;
	note: string;
};