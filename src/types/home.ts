import type { DripsData } from '#/types/drips';
import type { FooterData } from '#/types/footer';
import type { FreshnessData } from '#/types/freshness';
import type { FramesData } from '#/types/frames';
import type { HeaderData } from '#/types/header';
import type { HeroData } from '#/types/hero';
import type { HistoryData } from '#/types/history';

export type HomePageData = {
	headerData: HeaderData;
	heroData: HeroData;
	freshnessData: FreshnessData;
	historyData: HistoryData;
	framesData: FramesData;
	dripsData: DripsData;
	footerData: FooterData;
};