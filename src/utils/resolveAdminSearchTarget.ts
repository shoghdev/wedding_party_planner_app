import type { AdminState } from '@/types/admin';

type AdminSearchSection = Readonly<{
  path: string;
  getItems: (state: AdminState) => Array<Record<string, unknown>>;
  fields: readonly string[];
}>;

const ADMIN_SEARCH_SECTIONS: readonly AdminSearchSection[] = [
  {
    path: '/admin/bookings',
    getItems: (state) => state.bookings,
    fields: ['clientName', 'email', 'serviceType', 'id'],
  },
  {
    path: '/admin/testimonials',
    getItems: (state) => state.testimonials,
    fields: ['clientName', 'eventType', 'quote', 'id'],
  },
  {
    path: '/admin/services',
    getItems: (state) => state.services,
    fields: ['title', 'description', 'id'],
  },
  {
    path: '/admin/events',
    getItems: (state) => state.events,
    fields: ['title', 'location', 'description', 'id'],
  },
  {
    path: '/admin/gallery',
    getItems: (state) => state.gallery,
    fields: ['title', 'category', 'id'],
  },
  {
    path: '/admin/code-table',
    getItems: (state) => state.codeTable,
    fields: ['code', 'label', 'category', 'description', 'id'],
  },
];

export const resolveAdminSearchTarget = (query: string, state: AdminState): string => {
  const trimmed = query.trim();

  if (!trimmed) {
    return '/admin';
  }

  const normalized = trimmed.toLowerCase();
  let bestPath = '/admin';
  let bestCount = 0;

  ADMIN_SEARCH_SECTIONS.forEach((section) => {
    const count = section.getItems(state).filter((item) =>
      section.fields.some((field) =>
        String(item[field] ?? '')
          .toLowerCase()
          .includes(normalized),
      ),
    ).length;

    if (count > bestCount) {
      bestCount = count;
      bestPath = section.path;
    }
  });

  return `${bestPath}?search=${encodeURIComponent(trimmed)}`;
};
