import type { HomeContent, ServiceCard, StorySlide, ValueProp } from '@/types/home';
import {
  MOCK_HOME_CONTENT,
  MOCK_SERVICES,
  MOCK_STORIES,
  MOCK_VALUE_PROPS,
} from '@/api/mocks/home';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHomeContent = async (): Promise<HomeContent> => {
  await delay(100);
  return MOCK_HOME_CONTENT;
};

export const fetchValueProps = async (): Promise<readonly ValueProp[]> => {
  await delay(100);
  return MOCK_VALUE_PROPS;
};

export const fetchServices = async (): Promise<readonly ServiceCard[]> => {
  await delay(100);
  return MOCK_SERVICES;
};

export const fetchStories = async (): Promise<readonly StorySlide[]> => {
  await delay(100);
  return MOCK_STORIES;
};
