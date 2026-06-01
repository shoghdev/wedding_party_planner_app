import type { PortfolioPageData } from '@/types/portfolio';

export const MOCK_PORTFOLIO_PAGE: PortfolioPageData = {
  items: [
    {
      id: 'portfolio-1',
      imageUrl:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
      altKey: 'portfolioPage.items.floralArch',
      category: 'weddings',
    },
    {
      id: 'portfolio-2',
      imageUrl:
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&q=80',
      altKey: 'portfolioPage.items.outdoorCeremony',
      category: 'weddings',
    },
    {
      id: 'portfolio-3',
      imageUrl:
        'https://top15moscow.ru/storage/photos/February2020/thumbnails/1x/AkXUZOyvomPFT1zkGJ7F.jpg?1609188740',
      altKey: 'portfolioPage.items.tableSetting',
      category: 'parties',
    },
    {
      id: 'portfolio-4',
      imageUrl:
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=80',
      altKey: 'portfolioPage.items.candlelitReception',
      category: 'parties',
    },
    {
      id: 'portfolio-5',
      imageUrl:
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=80',
      altKey: 'portfolioPage.items.gardenCelebration',
      category: 'destinations',
    },
    {
      id: 'portfolio-6',
      imageUrl:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80',
      altKey: 'portfolioPage.items.dessertDisplay',
      category: 'showers',
    },
    {
      id: 'portfolio-7',
      imageUrl:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
      altKey: 'portfolioPage.items.bridalBouquet',
      category: 'engagements',
    },
    {
      id: 'portfolio-8',
      imageUrl:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80',
      altKey: 'portfolioPage.items.corporateGala',
      category: 'corporate',
    },
    {
      id: 'portfolio-9',
      imageUrl:
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=80',
      altKey: 'portfolioPage.items.destinationVows',
      category: 'destinations',
    },
    {
      id: 'portfolio-10',
      imageUrl:
        'https://www.norali.nl/wp-content/uploads/2021/08/Bohemian_sweet_table_norali_styling.jpg',
      altKey: 'portfolioPage.items.engagementDinner',
      category: 'engagements',
    },
    {
      id: 'portfolio-11',
      imageUrl:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=80',
      altKey: 'portfolioPage.items.babyShower',
      category: 'showers',
    },
    {
      id: 'portfolio-12',
      imageUrl:
        'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=700&q=80',
      altKey: 'portfolioPage.items.corporateSummit',
      category: 'corporate',
    },
  ],
} as const;
