import dayjs from 'dayjs';
import type { AdminState } from '@/types/admin';
import type { AdminNotification } from '@/types/adminNotification';

const DRAFT_SECTIONS = [
  { key: 'services' as const, path: '/admin/services', labelKey: 'service' },
  { key: 'events' as const, path: '/admin/events', labelKey: 'event' },
  { key: 'gallery' as const, path: '/admin/gallery', labelKey: 'galleryItem' },
  { key: 'testimonials' as const, path: '/admin/testimonials', labelKey: 'testimonial' },
] as const;

const getDraftTitle = (sectionKey: (typeof DRAFT_SECTIONS)[number]['key'], item: Record<string, unknown>) => {
  if (sectionKey === 'testimonials') {
    return String(item.clientName ?? '');
  }

  return String(item.title ?? '');
};

export const buildAdminNotifications = (state: AdminState): AdminNotification[] => {
  const notifications: AdminNotification[] = [];

  state.bookings
    .filter((booking) => booking.status === 'pending')
    .forEach((booking) => {
      notifications.push({
        id: `booking-pending-${booking.id}`,
        kind: 'pendingBooking',
        titleKey: 'admin.notifications.pendingBookingTitle',
        messageKey: 'admin.notifications.pendingBookingMessage',
        messageValues: {
          name: booking.clientName,
          service: booking.serviceType,
        },
        path: `/admin/bookings?edit=${encodeURIComponent(booking.id)}`,
        createdAt: booking.createdAt,
      });
    });

  DRAFT_SECTIONS.forEach(({ key, path, labelKey }) => {
    const items = state[key] as Array<Record<string, unknown> & { id: string; status?: string }>;

    items
      .filter((item) => item.status === 'draft')
      .forEach((item) => {
        notifications.push({
          id: `draft-${key}-${item.id}`,
          kind: 'draftContent',
          titleKey: 'admin.notifications.draftContentTitle',
          messageKey: 'admin.notifications.draftContentMessage',
          messageValues: {
            title: getDraftTitle(key, item),
            type: labelKey,
          },
          path: `${path}?edit=${encodeURIComponent(item.id)}`,
          createdAt: dayjs().subtract(1, 'day').toISOString(),
        });
      });
  });

  const today = dayjs().startOf('day');

  state.events
    .filter((event) => event.status === 'published' && dayjs(event.date).isAfter(today))
    .filter((event) => dayjs(event.date).diff(today, 'day') <= 30)
    .forEach((event) => {
      notifications.push({
        id: `event-upcoming-${event.id}`,
        kind: 'upcomingEvent',
        titleKey: 'admin.notifications.upcomingEventTitle',
        messageKey: 'admin.notifications.upcomingEventMessage',
        messageValues: {
          title: event.title,
          date: dayjs(event.date).format('MMM D, YYYY'),
        },
        path: `/admin/events?edit=${encodeURIComponent(event.id)}`,
        createdAt: dayjs(event.date).subtract(7, 'day').toISOString(),
      });
    });

  return notifications.sort(
    (left, right) => dayjs(right.createdAt).valueOf() - dayjs(left.createdAt).valueOf(),
  );
};
