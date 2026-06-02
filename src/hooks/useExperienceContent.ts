import { useQuery } from '@tanstack/react-query';
import {
  fetchExperienceContent,
  fetchExperienceGallery,
  fetchProcessSteps,
  fetchWhyCouplesFeatures,
} from '@/api/experience';
import { QUERY_KEYS } from '@/consts/queryKeys';

export const useExperienceContent = () =>
  useQuery({
    queryKey: QUERY_KEYS.experience.content,
    queryFn: fetchExperienceContent,
  });

export const useProcessSteps = () =>
  useQuery({
    queryKey: QUERY_KEYS.experience.processSteps,
    queryFn: fetchProcessSteps,
  });

export const useWhyCouplesFeatures = () =>
  useQuery({
    queryKey: QUERY_KEYS.experience.whyCouples,
    queryFn: fetchWhyCouplesFeatures,
  });

export const useExperienceGallery = () =>
  useQuery({
    queryKey: QUERY_KEYS.experience.gallery,
    queryFn: fetchExperienceGallery,
  });
