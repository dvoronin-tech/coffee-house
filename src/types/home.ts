import type { FreshnessData } from '#/types/freshness';
import type { HeaderData } from '#/types/header';
import type { HeroData } from '#/types/hero';
import type { HistoryData } from '#/types/history';
import type { GrainData } from '#/types/grain';

export type HomePageData = {
	headerData: HeaderData;
	heroData: HeroData;
	freshnessData: FreshnessData;
	historyData: HistoryData;
	grainData: GrainData;
};