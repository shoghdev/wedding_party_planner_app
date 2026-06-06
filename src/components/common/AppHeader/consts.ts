import type { NavItem } from '@/types/home';

export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'experience', href: '/experience' },
  { key: 'contact', href: '/contact' },
] as const;

export const getActiveNavKey = (pathname: string, hash: string): string => {
  if (pathname === '/contact') {
    return 'contact';
  }

  if (pathname === '/experience') {
    return 'experience';
  }

  if (pathname === '/about') {
    return 'about';
  }

  if (pathname === '/services') {
    return 'services';
  }

  if (pathname === '/portfolio') {
    return 'portfolio';
  }

  if (pathname === '/') {
    switch (hash) {
      case '#services':
        return 'services';
      case '#portfolio':
        return 'portfolio';
      default:
        return 'home';
    }
  }

  return 'home';
};
