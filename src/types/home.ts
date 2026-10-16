import type { FreshnessData } from '#/types/freshness';
import type { HeaderData } from '#/types/header';
import type { HeroData } from '#/types/hero';
import type { HistoryData } from '#/types/history';
import type { SubscriptionData } from '#/types/subscription';

export type HomePageData = {
	headerData: HeaderData;
	heroData: HeroData;
	freshnessData: FreshnessData;
	historyData: HistoryData;
	subscriptionData: SubscriptionData;
};