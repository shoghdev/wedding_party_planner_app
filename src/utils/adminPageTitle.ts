import { ADMIN_NAV_ITEMS } from '@/consts/adminNav';

export const resolveAdminNavItem = (pathname: string) =>
  ADMIN_NAV_ITEMS.find(
    (item) =>
      item.path === pathname ||
      (item.path !== '/admin' && pathname.startsWith(item.path)),
  ) ?? ADMIN_NAV_ITEMS[0];
