import type { DeliveryData } from '#/types/delivery';
import type { FreshnessData } from '#/types/freshness';
import type { HeaderData } from '#/types/header';
import type { HeroData } from '#/types/hero';
import type { HistoryData } from '#/types/history';

export type HomePageData = {
	headerData: HeaderData;
	heroData: HeroData;
	freshnessData: FreshnessData;
	historyData: HistoryData;
	deliveryData: DeliveryData;
};