import type { DripsData } from '#/types/drips';
import type { DeliveryData } from '#/types/delivery';
import type { ContactData } from '#/types/contact';
import type { FooterData } from '#/types/footer';
import type { FreshnessData } from '#/types/freshness';
import type { FramesData } from '#/types/frames';
import type { HeaderData } from '#/types/header';
import type { HeroData } from '#/types/hero';
import type { HistoryData } from '#/types/history';
import type { GrainData } from '#/types/grain';
import type { SubscriptionData } from '#/types/subscription';

export type HomePageData = {
    headerData: HeaderData;
    heroData: HeroData;
    freshnessData: FreshnessData;
    historyData: HistoryData;
    grainData: GrainData;
    framesData: FramesData;
    dripsData: DripsData;
    subscriptionData: SubscriptionData;
    deliveryData: DeliveryData;
    contactData: ContactData;
    footerData: FooterData;
};
