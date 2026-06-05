import type { ServicesPageData } from '@/types/services';

export const MOCK_SERVICES_PAGE: ServicesPageData = {
  content: {
    hero: {
      primaryImageUrl:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
      secondaryImageUrl:
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    },
  },
  cards: [
    {
      id: 'fullPlanning',
      iconKey: 'wedding',
      imageUrl:
        'https://top15moscow.ru/storage/photos/February2020/thumbnails/1x/AkXUZOyvomPFT1zkGJ7F.jpg?1609188740',
      titleKey: 'servicesPage.cards.fullPlanning.title',
      descriptionKey: 'servicesPage.cards.fullPlanning.description',
    },
    {
      id: 'partialPlanning',
      iconKey: 'parties',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJr9JDIO5KPquohLNotyyOh5kknNTltinFQ&s',
      titleKey: 'servicesPage.cards.partialPlanning.title',
      descriptionKey: 'servicesPage.cards.partialPlanning.description',
    },
    {
      id: 'designStyling',
      iconKey: 'decorations',
      imageUrl:
        'https://i.pinimg.com/236x/25/08/ca/2508cae9efa5d5146347a3177ae1b169.jpg',
      titleKey: 'servicesPage.cards.designStyling.title',
      descriptionKey: 'servicesPage.cards.designStyling.description',
    },
    {
      id: 'dayCoordination',
      iconKey: 'stressFree',
      imageUrl:
        'https://www.norali.nl/wp-content/uploads/2021/08/Bohemian_sweet_table_norali_styling.jpg',
      titleKey: 'servicesPage.cards.dayCoordination.title',
      descriptionKey: 'servicesPage.cards.dayCoordination.description',
    },
  ],
} as const;
