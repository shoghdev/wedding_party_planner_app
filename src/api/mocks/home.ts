import type { HomeContent, ServiceCard, StorySlide, ValueProp } from '@/types/home';

export const MOCK_HOME_CONTENT: HomeContent = {
  hero: {
    mainImageUrl:
      'https://i.pinimg.com/736x/d8/c0/e1/d8c0e17972009a1c03ba820ffa958c59.jpg',
    polaroidOneUrl:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80',
    polaroidTwoUrl:
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=80',
    accentImageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
  },
  about: {
    imageUrl:
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=700&q=80',
  },
};

export const MOCK_VALUE_PROPS: readonly ValueProp[] = [
  {
    id: 'expertise',
    iconKey: 'expertise',
    titleKey: 'home.about.values.expertise.title',
    descriptionKey: 'home.about.values.expertise.description',
  },
  {
    id: 'decorations',
    iconKey: 'decorations',
    titleKey: 'home.about.values.decorations.title',
    descriptionKey: 'home.about.values.decorations.description',
  },
  {
    id: 'personalized',
    iconKey: 'personalized',
    titleKey: 'home.about.values.personalized.title',
    descriptionKey: 'home.about.values.personalized.description',
  },
  {
    id: 'stressFree',
    iconKey: 'stressFree',
    titleKey: 'home.about.values.stressFree.title',
    descriptionKey: 'home.about.values.stressFree.description',
  },
] as const;

export const MOCK_SERVICES: readonly ServiceCard[] = [
  {
    id: 'wedding',
    imageUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    titleKey: 'home.services.cards.wedding.title',
    descriptionKey: 'home.services.cards.wedding.description',
  },
  {
    id: 'parties',
    imageUrl:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    titleKey: 'home.services.cards.parties.title',
    descriptionKey: 'home.services.cards.parties.description',
  },
  {
    id: 'destination',
    imageUrl:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    titleKey: 'home.services.cards.destination.title',
    descriptionKey: 'home.services.cards.destination.description',
  },
] as const;

export const MOCK_STORIES: readonly StorySlide[] = [
  {
    id: 'story-1',
    imageUrl:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
    altKey: 'home.stories.slides.one',
  },
  {
    id: 'story-2',
    imageUrl:
      'https://images.unsplash.com/photo-1522673607200-23d186a7f2e5?w=400&q=80',
    altKey: 'home.stories.slides.two',
  },
  {
    id: 'story-3',
    imageUrl:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
    altKey: 'home.stories.slides.three',
  },
  {
    id: 'story-4',
    imageUrl:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&q=80',
    altKey: 'home.stories.slides.four',
  },
  {
    id: 'story-5',
    imageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
    altKey: 'home.stories.slides.five',
  },
  {
    id: 'story-6',
    imageUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    altKey: 'home.stories.slides.six',
  },
  {
    id: 'story-7',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    altKey: 'home.stories.slides.seven',
  },
  {
    id: 'story-8',
    imageUrl:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80&sat=-20',
    altKey: 'home.stories.slides.eight',
  },
] as const;
