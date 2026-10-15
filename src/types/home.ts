import type { FreshnessData } from '#/types/freshness';
import type { HeaderData } from '#/types/header';
import type { HeroData } from '#/types/hero';

export type HomePageData = {
	headerData: HeaderData;
	heroData: HeroData;
	freshnessData: FreshnessData;
};
