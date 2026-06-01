import { MOCK_PORTFOLIO_PAGE } from '@/api/mocks/portfolio';
import type { PortfolioPageData } from '@/types/portfolio';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPortfolioPage = async (): Promise<PortfolioPageData> => {
  await delay(100);
  return MOCK_PORTFOLIO_PAGE;
};
