import { EXPERIENCE_HERO_HEYGEN_VIDEO_URL } from '@/consts/experienceHeroMedia';
import type {
  ExperienceContent,
  ExperienceGalleryImage,
  ProcessStep,
  WhyCouplesFeature,
} from '@/types/experience';

export const MOCK_EXPERIENCE_CONTENT: ExperienceContent = {
  heroImageUrl: '/images/experience/heroImage.jpg',
  heroVideoUrl: EXPERIENCE_HERO_HEYGEN_VIDEO_URL,
  whyCouplesImageUrl: '/images/experience/why-couples.webp',
  ctaImageUrl: '/images/experience/cta-candles.jpg',
};

export const MOCK_PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: 'discovery',
    stepNumber: '01',
    iconKey: 'discovery',
    titleKey: 'experience.process.steps.discovery.title',
    descriptionKey: 'experience.process.steps.discovery.description',
  },
  {
    id: 'concept',
    stepNumber: '02',
    iconKey: 'concept',
    titleKey: 'experience.process.steps.concept.title',
    descriptionKey: 'experience.process.steps.concept.description',
  },
  {
    id: 'planning',
    stepNumber: '03',
    iconKey: 'planning',
    titleKey: 'experience.process.steps.planning.title',
    descriptionKey: 'experience.process.steps.planning.description',
  },
  {
    id: 'styling',
    stepNumber: '04',
    iconKey: 'styling',
    titleKey: 'experience.process.steps.styling.title',
    descriptionKey: 'experience.process.steps.styling.description',
  },
  {
    id: 'celebrate',
    stepNumber: '05',
    iconKey: 'celebrate',
    titleKey: 'experience.process.steps.celebrate.title',
    descriptionKey: 'experience.process.steps.celebrate.description',
  },
] as const;

export const MOCK_WHY_COUPLES_FEATURES: readonly WhyCouplesFeature[] = [
  {
    id: 'personalized',
    iconKey: 'personalized',
    titleKey: 'experience.whyCouples.features.personalized.title',
    descriptionKey: 'experience.whyCouples.features.personalized.description',
  },
  {
    id: 'stressFree',
    iconKey: 'stressFree',
    titleKey: 'experience.whyCouples.features.stressFree.title',
    descriptionKey: 'experience.whyCouples.features.stressFree.description',
  },
  {
    id: 'creative',
    iconKey: 'creative',
    titleKey: 'experience.whyCouples.features.creative.title',
    descriptionKey: 'experience.whyCouples.features.creative.description',
  },
  {
    id: 'trusted',
    iconKey: 'trusted',
    titleKey: 'experience.whyCouples.features.trusted.title',
    descriptionKey: 'experience.whyCouples.features.trusted.description',
  },
  {
    id: 'luxury',
    iconKey: 'luxury',
    titleKey: 'experience.whyCouples.features.luxury.title',
    descriptionKey: 'experience.whyCouples.features.luxury.description',
  },
  {
    id: 'attention',
    iconKey: 'attention',
    titleKey: 'experience.whyCouples.features.attention.title',
    descriptionKey: 'experience.whyCouples.features.attention.description',
  },
] as const;

export const MOCK_EXPERIENCE_GALLERY: readonly ExperienceGalleryImage[] = [
  {
    id: 'gallery-1',
    imageUrl:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    altKey: 'experience.gallery.images.one',
  },
  {
    id: 'gallery-2',
    imageUrl: '/images/experience/gallery-2.jpg',
    altKey: 'experience.gallery.images.two',
  },
  {
    id: 'gallery-3',
    imageUrl:
      'https://rukminim2.flixcart.com/image/480/640/xif0q/balloon/z/r/0/3-63-unique-trending-happy-birthday-balloon-retro-glitter-original-imagr4fcsh7hhzz2.jpeg?q=20',
    altKey: 'experience.gallery.images.three',
  },
  {
    id: 'gallery-4',
    imageUrl:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    altKey: 'experience.gallery.images.four',
  },
] as const;
