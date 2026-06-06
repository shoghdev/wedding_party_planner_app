import { MOCK_PORTFOLIO_DETAILS } from '@/api/mocks/portfolioDetails';
import { MOCK_PORTFOLIO_PAGE } from '@/api/mocks/portfolio';
import type { PortfolioDetail, PortfolioPageData } from '@/types/portfolio';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPortfolioPage = async (): Promise<PortfolioPageData> => {
  await delay(100);
  return MOCK_PORTFOLIO_PAGE;
};

export const fetchPortfolioDetail = async (id: string): Promise<PortfolioDetail | null> => {
  await delay(100);
  return MOCK_PORTFOLIO_DETAILS[id] ?? null;
};
