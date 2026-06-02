import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { Logo } from '@/components/common/Logo';
import { PageContainer } from '@/components/common/PageContainer';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import type { NavItem } from '@/types/home';
import type { ThemeMode } from '@/types/theme';
import { NAV_ITEMS } from './consts';
import { styles } from './styles';

type AppHeaderProps = Readonly<{
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

const isNavActive = (pathname: string, item: NavItem) => {
  if (item.key === 'home') {
    return pathname === '/';
  }
  if (item.key === 'about') {
    return pathname === '/about';
  }
  if (item.key === 'experience') {
    return pathname === '/experience';
  }
  return false;
};

export const AppHeader = ({ themeMode, onThemeToggle }: AppHeaderProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClass = [styles.header, scrolled && styles.headerScrolled]
    .filter(Boolean)
    .join(' ');

  const ctaButton = (
    <Button type="primary" size="middle">
      {t('header.cta')}
    </Button>
  );

  return (
    <header className={headerClass}>
      <PageContainer>
        <div className={styles.mainBar}>
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMenuOpen(true)}
            aria-label={t('header.menuToggle')}
          >
            <MenuOutlined />
          </button>

          <div className={styles.logoSlot}>
            <Logo />
          </div>

          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={[
                  styles.navLink,
                  isNavActive(pathname, item) && styles.navLinkActive,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {t(`header.nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <div className={styles.desktopUtilities}>
              <ThemeToggle mode={themeMode} onToggle={onThemeToggle} />
              <LanguageSelector />
            </div>
            <span className={styles.mobileCta}>{ctaButton}</span>
            <span className={styles.desktopCta}>{ctaButton}</span>
          </div>
        </div>

        <div className={styles.utilityBar}>
          <ThemeToggle mode={themeMode} onToggle={onThemeToggle} />
          <LanguageSelector />
        </div>
      </PageContainer>

      <Drawer
        title={t('header.logo.title')}
        placement="left"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        width={280}
      >
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={styles.drawerNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {t(`header.nav.${item.key}`)}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
  );
};
