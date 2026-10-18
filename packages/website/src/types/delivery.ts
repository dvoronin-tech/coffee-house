export type DeliveryFact = {
	label: string;
	value: string;
};

export type DeliveryData = {
	shipping: {
		eyebrow: string;
		title: string;
		facts: readonly DeliveryFact[];
		subscriptionNote: string;
		scopeNote: string;
	};
	pickup: {
		eyebrow: string;
		title: string;
		facts: readonly DeliveryFact[];
		phoneValue: string;
		phoneHref: string;
		mapLabel: string;
		mapHref: string;
	};
};
