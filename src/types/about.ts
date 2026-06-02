export type AboutContent = Readonly<{
  heroImageUrl: string;
  storyImageUrl: string;
}>;

export type AboutStat = Readonly<{
  id: string;
  valueKey: string;
  labelKey: string;
}>;

export type AboutDifferentiator = Readonly<{
  id: string;
  iconKey: string;
  titleKey: string;
  descriptionKey: string;
}>;
