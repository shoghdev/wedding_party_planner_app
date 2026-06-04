import type { ServiceCard } from '@/types/home';

export type ServicesPageContent = Readonly<{
  hero: Readonly<{
    primaryImageUrl: string;
    secondaryImageUrl: string;
  }>;
}>;

export type ServicesPageData = Readonly<{
  content: ServicesPageContent;
  cards: readonly ServiceCard[];
}>;
