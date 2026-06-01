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
  category: Exclude<PortfolioCategory, 'all'>;
}>;

export type PortfolioPageData = Readonly<{
  items: readonly PortfolioItem[];
}>;
