import { useQuery } from '@tanstack/react-query';
import { fetchServicesPage } from '@/api/services';
import { QUERY_KEYS } from '@/consts/queryKeys';

export const useServicesPage = () =>
  useQuery({
    queryKey: QUERY_KEYS.services.page,
    queryFn: fetchServicesPage,
  });
