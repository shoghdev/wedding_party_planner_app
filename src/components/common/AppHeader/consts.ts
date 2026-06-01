import type { NavItem } from '@/types/home';

export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/#about' },
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'experience', href: '/#experience' },
  { key: 'blog', href: '/#blog' },
  { key: 'contact', href: '/#contact' },
] as const;

export const getActiveNavKey = (pathname: string): string => {
  if (pathname === '/services') return 'services';
  if (pathname === '/portfolio') return 'portfolio';
  if (pathname === '/') return 'home';
  return '';
};
