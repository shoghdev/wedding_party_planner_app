import type { NavItem } from '@/types/home';

export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/#services' },
  { key: 'portfolio', href: '/#portfolio' },
  { key: 'experience', href: '/experience' },
  { key: 'blog', href: '/#blog' },
  { key: 'contact', href: '/#contact' },
] as const;

export const ACTIVE_NAV_KEY = 'experience';

