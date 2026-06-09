import { useQuery } from '@tanstack/react-query';
import { fetchPortfolioDetail } from '@/api/portfolio';
import { QUERY_KEYS } from '@/consts/queryKeys';

export const usePortfolioDetails = (id: string) =>
  useQuery({
    queryKey: QUERY_KEYS.portfolio.detail(id),
    queryFn: () => fetchPortfolioDetail(id),
    enabled: Boolean(id),
  });
