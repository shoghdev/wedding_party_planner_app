import { MOCK_SERVICES_PAGE } from '@/api/mocks/services';
import type { ServicesPageData } from '@/types/services';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchServicesPage = async (): Promise<ServicesPageData> => {
  await delay(100);
  return MOCK_SERVICES_PAGE;
};
