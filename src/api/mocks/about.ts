import type { AboutContent, AboutDifferentiator, AboutStat } from '@/types/about';

export const MOCK_ABOUT_CONTENT: AboutContent = {
  heroImageUrl: '/images/about/hero.webp',
  storyImageUrl: '/images/about/story.webp',
};

export const MOCK_ABOUT_STATS: readonly AboutStat[] = [
  { id: 'events', valueKey: 'about.stats.events.value', labelKey: 'about.stats.events.label' },
  { id: 'years', valueKey: 'about.stats.years.value', labelKey: 'about.stats.years.label' },
  { id: 'couples', valueKey: 'about.stats.couples.value', labelKey: 'about.stats.couples.label' },
  {
    id: 'dedication',
    valueKey: 'about.stats.dedication.value',
    labelKey: 'about.stats.dedication.label',
  },
] as const;

export const MOCK_ABOUT_DIFFERENTIATORS: readonly AboutDifferentiator[] = [
  {
    id: 'personalized',
    iconKey: 'personalized',
    titleKey: 'about.different.items.personalized.title',
    descriptionKey: 'about.different.items.personalized.description',
  },
  {
    id: 'creative',
    iconKey: 'creative',
    titleKey: 'about.different.items.creative.title',
    descriptionKey: 'about.different.items.creative.description',
  },
  {
    id: 'stressFree',
    iconKey: 'stressFree',
    titleKey: 'about.different.items.stressFree.title',
    descriptionKey: 'about.different.items.stressFree.description',
  },
  {
    id: 'trusted',
    iconKey: 'trusted',
    titleKey: 'about.different.items.trusted.title',
    descriptionKey: 'about.different.items.trusted.description',
  },
] as const;
