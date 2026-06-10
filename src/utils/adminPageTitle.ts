import { ADMIN_NAV_ITEMS } from '@/consts/adminNav';

const ADMIN_PAGE_TITLE_KEYS: Record<string, string> = {
  '/admin/profile': 'admin.profile.title',
};

export const resolveAdminNavItem = (pathname: string) =>
  ADMIN_NAV_ITEMS.find(
    (item) =>
      item.path === pathname ||
      (item.path !== '/admin' && pathname.startsWith(item.path)),
  ) ?? ADMIN_NAV_ITEMS[0];

export const resolveAdminPageTitleKey = (pathname: string) =>
  ADMIN_PAGE_TITLE_KEYS[pathname] ?? resolveAdminNavItem(pathname).labelKey;
