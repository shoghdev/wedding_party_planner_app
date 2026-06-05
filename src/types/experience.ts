export type ExperienceContent = Readonly<{
  heroImageUrl: string;
  heroVideoUrl?: string;
  whyCouplesImageUrl: string;
  ctaImageUrl: string;
}>;

export type ProcessStep = Readonly<{
  id: string;
  stepNumber: string;
  iconKey: string;
  titleKey: string;
  descriptionKey: string;
}>;

export type WhyCouplesFeature = Readonly<{
  id: string;
  iconKey: string;
  titleKey: string;
  descriptionKey: string;
}>;

export type ExperienceGalleryImage = Readonly<{
  id: string;
  imageUrl: string;
  altKey: string;
}>;
