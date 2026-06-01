import { useQuery } from '@tanstack/react-query';
import { fetchPortfolioPage } from '@/api/portfolio';
import { QUERY_KEYS } from '@/consts/queryKeys';

export const usePortfolioPage = () =>
  useQuery({
    queryKey: QUERY_KEYS.portfolio.page,
    queryFn: fetchPortfolioPage,
  });
