import type { AdminListSectionConfig } from '@/consts/adminSections';
import {
  ADMIN_EVENTS_CONFIG,
  ADMIN_GALLERY_CONFIG,
  ADMIN_SERVICES_CONFIG,
  ADMIN_TESTIMONIALS_CONFIG,
} from '@/consts/adminSectionConfigs';
import type { AdminListSectionKey } from '@/types/admin';

export type DashboardContentType = 'service' | 'experience' | 'testimonial' | 'gallery';

export const DASHBOARD_CONTENT_TYPES = [
  'service',
  'experience',
  'testimonial',
  'gallery',
] as const satisfies readonly DashboardContentType[];

export const DASHBOARD_CONTENT_CONFIG: Record<
  DashboardContentType,
  Readonly<{ sectionKey: AdminListSectionKey; config: AdminListSectionConfig }>
> = {
  service: { sectionKey: 'services', config: ADMIN_SERVICES_CONFIG },
  experience: { sectionKey: 'events', config: ADMIN_EVENTS_CONFIG },
  testimonial: { sectionKey: 'testimonials', config: ADMIN_TESTIMONIALS_CONFIG },
  gallery: { sectionKey: 'gallery', config: ADMIN_GALLERY_CONFIG },
};
