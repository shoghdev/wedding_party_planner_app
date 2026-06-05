import type { PortfolioCategory } from '@/types/portfolio';

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = [
  'all',
  'weddings',
  'parties',
  'destinations',
  'engagements',
  'showers',
  'corporate',
] as const;

export const PORTFOLIO_PAGE_SIZE = 6;
