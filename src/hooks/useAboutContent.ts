import { useQuery } from '@tanstack/react-query';
import {
  fetchAboutContent,
  fetchAboutDifferentiators,
  fetchAboutStats,
} from '@/api/about';
import { QUERY_KEYS } from '@/consts/queryKeys';

export const useAboutContent = () =>
  useQuery({
    queryKey: QUERY_KEYS.about.content,
    queryFn: fetchAboutContent,
  });

export const useAboutStats = () =>
  useQuery({
    queryKey: QUERY_KEYS.about.stats,
    queryFn: fetchAboutStats,
  });

export const useAboutDifferentiators = () =>
  useQuery({
    queryKey: QUERY_KEYS.about.differentiators,
    queryFn: fetchAboutDifferentiators,
  });
