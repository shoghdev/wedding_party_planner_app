import type {
  ExperienceContent,
  ExperienceGalleryImage,
  ProcessStep,
  WhyCouplesFeature,
} from '@/types/experience';
import {
  MOCK_EXPERIENCE_CONTENT,
  MOCK_EXPERIENCE_GALLERY,
  MOCK_PROCESS_STEPS,
  MOCK_WHY_COUPLES_FEATURES,
} from '@/api/mocks/experience';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchExperienceContent = async (): Promise<ExperienceContent> => {
  await delay(100);
  return MOCK_EXPERIENCE_CONTENT;
};

export const fetchProcessSteps = async (): Promise<readonly ProcessStep[]> => {
  await delay(100);
  return MOCK_PROCESS_STEPS;
};

export const fetchWhyCouplesFeatures = async (): Promise<readonly WhyCouplesFeature[]> => {
  await delay(100);
  return MOCK_WHY_COUPLES_FEATURES;
};

export const fetchExperienceGallery = async (): Promise<readonly ExperienceGalleryImage[]> => {
  await delay(100);
  return MOCK_EXPERIENCE_GALLERY;
};
