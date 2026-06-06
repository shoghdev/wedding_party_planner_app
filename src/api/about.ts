import type { AboutContent, AboutDifferentiator, AboutStat } from '@/types/about';
import { fetchAdminState } from '@/api/adminState';
import {
  MOCK_ABOUT_CONTENT,
  MOCK_ABOUT_DIFFERENTIATORS,
  MOCK_ABOUT_STATS,
} from '@/api/mocks/about';
import { mergeAboutContent } from '@/utils/adminContentBridge';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAboutContent = async (): Promise<AboutContent> => {
  await delay(100);
  const adminState = await fetchAdminState();
  return mergeAboutContent(MOCK_ABOUT_CONTENT, adminState);
};

export const fetchAboutStats = async (): Promise<readonly AboutStat[]> => {
  await delay(100);
  return MOCK_ABOUT_STATS;
};

export const fetchAboutDifferentiators = async (): Promise<readonly AboutDifferentiator[]> => {
  await delay(100);
  return MOCK_ABOUT_DIFFERENTIATORS;
};
