export type NavItem = Readonly<{
  key: string;
  href: string;
}>;

export type ValueProp = Readonly<{
  id: string;
  iconKey: string;
  titleKey: string;
  descriptionKey: string;
}>;

export type HomeFeature = Readonly<{
  id: string;
  iconKey: string;
  titleKey: string;
  descriptionKey: string;
}>;

export type ServiceCard = Readonly<{
  id: string;
  iconKey: string;
  imageUrl: string;
  titleKey: string;
  descriptionKey: string;
}>;

export type StorySlide = Readonly<{
  id: string;
  imageUrl: string;
  altKey: string;
}>;

export type HomeContent = Readonly<{
  hero: Readonly<{
    mainImageUrl: string;
    polaroidOneUrl: string;
    polaroidTwoUrl: string;
    accentImageUrl: string;
  }>;
  about: Readonly<{
    imageUrl: string;
  }>;
}>;
