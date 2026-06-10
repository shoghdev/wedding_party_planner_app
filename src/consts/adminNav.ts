import type { AdminNavItem } from '@/types/admin';

export const ADMIN_NAV_ITEMS: readonly AdminNavItem[] = [
  { key: 'dashboard', path: '/admin', labelKey: 'admin.nav.dashboard', icon: 'DashboardOutlined' },
  { key: 'home', path: '/admin/home', labelKey: 'admin.nav.home', icon: 'HomeOutlined' },
  { key: 'about', path: '/admin/about', labelKey: 'admin.nav.about', icon: 'InfoCircleOutlined' },
  {
    key: 'services',
    path: '/admin/services',
    labelKey: 'admin.nav.services',
    icon: 'AppstoreOutlined',
  },
  {
    key: 'experience',
    path: '/admin/experience',
    labelKey: 'admin.nav.experience',
    icon: 'StarOutlined',
  },
  {
    key: 'gallery',
    path: '/admin/gallery',
    labelKey: 'admin.nav.gallery',
    icon: 'PictureOutlined',
  },
  {
    key: 'testimonials',
    path: '/admin/testimonials',
    labelKey: 'admin.nav.testimonials',
    icon: 'MessageOutlined',
  },
  {
    key: 'contact',
    path: '/admin/contact',
    labelKey: 'admin.nav.contact',
    icon: 'PhoneOutlined',
  },
  {
    key: 'bookings',
    path: '/admin/bookings',
    labelKey: 'admin.nav.bookings',
    icon: 'CalendarOutlined',
  },
  { key: 'events', path: '/admin/events', labelKey: 'admin.nav.events', icon: 'GiftOutlined' },
  {
    key: 'codeTable',
    path: '/admin/code-table',
    labelKey: 'admin.nav.codeTable',
    icon: 'TableOutlined',
  },
  {
    key: 'settings',
    path: '/admin/settings',
    labelKey: 'admin.nav.settings',
    icon: 'SettingOutlined',
  },
] as const;
