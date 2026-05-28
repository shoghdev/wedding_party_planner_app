import { useQuery } from '@tanstack/react-query';
import { fetchHomeContent, fetchServices, fetchStories, fetchValueProps } from '@/api/home';
import { QUERY_KEYS } from '@/consts/queryKeys';

export const useHomeContent = () =>
  useQuery({
    queryKey: QUERY_KEYS.home.content,
    queryFn: fetchHomeContent,
  });

export const useValueProps = () =>
  useQuery({
    queryKey: [...QUERY_KEYS.home.content, 'values'],
    queryFn: fetchValueProps,
  });

export const useServices = () =>
  useQuery({
    queryKey: QUERY_KEYS.home.services,
    queryFn: fetchServices,
  });

export const useStories = () =>
  useQuery({
    queryKey: QUERY_KEYS.home.stories,
    queryFn: fetchStories,
  });
