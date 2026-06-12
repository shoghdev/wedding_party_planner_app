import type { ReactNode } from 'react';
import { AppFooter } from '@/components/common/AppFooter';
import { AppHeader } from '@/components/common/AppHeader';
import { ChatWidget } from '@/components/common/ChatWidget';
import type { ThemeMode } from '@/types/theme';

type SiteLayoutProps = Readonly<{
  children: ReactNode;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

export const SiteLayout = ({ children, themeMode, onThemeToggle }: SiteLayoutProps) => (
  <>
    <AppHeader themeMode={themeMode} onThemeToggle={onThemeToggle} />
    <main>{children}</main>
    <AppFooter />
    <ChatWidget />
  </>
);
