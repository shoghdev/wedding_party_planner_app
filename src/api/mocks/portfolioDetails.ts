import type { PortfolioDetail } from '@/types/portfolio';

export const MOCK_PORTFOLIO_DETAILS: Readonly<Record<string, PortfolioDetail>> = {
  'portfolio-1': {
    id: 'portfolio-1',
    heroImageUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
    ],
    titleKey: 'portfolioDetails.elegantGardenWedding.title',
    descriptionKey: 'portfolioDetails.elegantGardenWedding.description',
    locationKey: 'portfolioDetails.elegantGardenWedding.location',
    guests: '120',
    planningKey: 'portfolioDetails.elegantGardenWedding.planning',
    styleKey: 'portfolioDetails.elegantGardenWedding.style',
    vendors: [
      {
        categoryKey: 'portfolioDetails.vendors.planningDesign',
        nameKey: 'portfolioDetails.vendors.dreamCelebrateTeam',
      },
      {
        categoryKey: 'portfolioDetails.vendors.photography',
        nameKey: 'portfolioDetails.vendors.capturedMoments',
      },
      {
        categoryKey: 'portfolioDetails.vendors.floralDecor',
        nameKey: 'portfolioDetails.vendors.blushAndBloom',
      },
      {
        categoryKey: 'portfolioDetails.vendors.catering',
        nameKey: 'portfolioDetails.vendors.gourmetDelights',
      },
    ],
  },
  'portfolio-2': {
    id: 'portfolio-2',
    heroImageUrl:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    ],
    titleKey: 'portfolioDetails.outdoorCeremony.title',
    descriptionKey: 'portfolioDetails.outdoorCeremony.description',
    locationKey: 'portfolioDetails.outdoorCeremony.location',
    guests: '85',
    planningKey: 'portfolioDetails.outdoorCeremony.planning',
    styleKey: 'portfolioDetails.outdoorCeremony.style',
    vendors: [
      {
        categoryKey: 'portfolioDetails.vendors.planningDesign',
        nameKey: 'portfolioDetails.vendors.dreamCelebrateTeam',
      },
      {
        categoryKey: 'portfolioDetails.vendors.photography',
        nameKey: 'portfolioDetails.vendors.capturedMoments',
      },
      {
        categoryKey: 'portfolioDetails.vendors.floralDecor',
        nameKey: 'portfolioDetails.vendors.blushAndBloom',
      },
      {
        categoryKey: 'portfolioDetails.vendors.catering',
        nameKey: 'portfolioDetails.vendors.gourmetDelights',
      },
    ],
  },
} as const;
