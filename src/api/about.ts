import type { AboutContent, AboutDifferentiator, AboutStat } from '@/types/about';
import {
  MOCK_ABOUT_CONTENT,
  MOCK_ABOUT_DIFFERENTIATORS,
  MOCK_ABOUT_STATS,
} from '@/api/mocks/about';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAboutContent = async (): Promise<AboutContent> => {
  await delay(100);
  return MOCK_ABOUT_CONTENT;
};

export const fetchAboutStats = async (): Promise<readonly AboutStat[]> => {
  await delay(100);
  return MOCK_ABOUT_STATS;
};

export const fetchAboutDifferentiators = async (): Promise<readonly AboutDifferentiator[]> => {
  await delay(100);
  return MOCK_ABOUT_DIFFERENTIATORS;
};
