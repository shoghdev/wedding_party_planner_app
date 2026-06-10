import dayjs from 'dayjs';
import type { AdminState, AdminStatus } from '@/types/admin';
import type { DashboardContentType } from '@/consts/adminDashboardContent';
import { getDashboardContentDate } from '@/utils/dashboardDateRange';

export type DashboardContentRow = Readonly<{
  id: string;
  title: string;
  imageUrl: string;
  type: DashboardContentType;
  date: string;
  status: AdminStatus;
}>;

export const buildDashboardContentRows = (state: AdminState): DashboardContentRow[] => {
  const serviceRows = state.services.map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    type: 'service' as const,
    date: getDashboardContentDate(item.id, dayjs().format('YYYY-MM-DD')),
    status: item.status,
  }));

  const experienceRows = state.events.map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    type: 'experience' as const,
    date: item.date,
    status: item.status,
  }));

  const testimonialRows = state.testimonials.map((item) => ({
    id: item.id,
    title: item.clientName,
    imageUrl: item.avatarUrl,
    type: 'testimonial' as const,
    date: getDashboardContentDate(item.id, dayjs().format('YYYY-MM-DD')),
    status: item.status,
  }));

  const galleryRows = state.gallery.map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    type: 'gallery' as const,
    date: getDashboardContentDate(item.id, dayjs().format('YYYY-MM-DD')),
    status: item.status,
  }));

  return [...serviceRows, ...experienceRows, ...testimonialRows, ...galleryRows].sort(
    (left, right) => dayjs(right.date).valueOf() - dayjs(left.date).valueOf(),
  );
};
