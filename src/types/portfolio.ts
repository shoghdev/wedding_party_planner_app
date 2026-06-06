export type PortfolioCategory =
  | 'all'
  | 'weddings'
  | 'parties'
  | 'destinations'
  | 'engagements'
  | 'showers'
  | 'corporate';

export type PortfolioItem = Readonly<{
  id: string;
  imageUrl: string;
  altKey: string;
  titleKey: string;
  category: Exclude<PortfolioCategory, 'all'>;
}>;

export type PortfolioPageData = Readonly<{
  items: readonly PortfolioItem[];
}>;

export type PortfolioVendor = Readonly<{
  categoryKey: string;
  nameKey: string;
}>;

export type PortfolioDetail = Readonly<{
  id: string;
  heroImageUrl: string;
  galleryImageUrls: readonly [string, string, string];
  titleKey: string;
  descriptionKey: string;
  locationKey: string;
  guests: string;
  planningKey: string;
  styleKey: string;
  vendors: readonly PortfolioVendor[];
}>;
