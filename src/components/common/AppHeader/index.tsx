import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { Logo } from '@/components/common/Logo';
import { PageContainer } from '@/components/common/PageContainer';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import type { ThemeMode } from '@/types/theme';
import { ACTIVE_NAV_KEY, NAV_ITEMS } from './consts';
import { styles } from './styles';

type AppHeaderProps = Readonly<{
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

export const AppHeader = ({ themeMode, onThemeToggle }: AppHeaderProps) => {
  const { t } = useTranslation();
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

  const navLinks = NAV_ITEMS.map((item) => (
    <a
      key={item.key}
      href={item.href}
      className={[styles.navLink, item.key === ACTIVE_NAV_KEY && styles.navLinkActive]
        .filter(Boolean)
        .join(' ')}
    >
      {t(`header.nav.${item.key}`)}
    </a>
  ));

  return (
    <header className={headerClass}>
      <PageContainer>
        <div className={styles.mainBar}>
          <div className={styles.logoSlot}>
            <Logo tone="header" />
          </div>

          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks}
          </nav>

          <div className={styles.actions}>
            <div className={styles.utilities}>
              <ThemeToggle mode={themeMode} onToggle={onThemeToggle} variant="header" />
              <LanguageSelector variant="header" />
            </div>
            <Button type="primary" size="middle" className={styles.ctaBtn}>
              {t('header.cta')}
            </Button>
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setMenuOpen(true)}
              aria-label={t('header.menuToggle')}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </PageContainer>

      <Drawer
        title={t('header.logo.title')}
        placement="right"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        width={300}
        className={styles.drawer}
      >
        <div className={styles.drawerUtilities}>
          <ThemeToggle mode={themeMode} onToggle={onThemeToggle} variant="header" />
          <LanguageSelector variant="header" />
        </div>
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={[
                styles.drawerNavLink,
                item.key === ACTIVE_NAV_KEY && styles.drawerNavLinkActive,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setMenuOpen(false)}
            >
              {t(`header.nav.${item.key}`)}
            </a>
          ))}
          <Button type="primary" block size="large" className={styles.drawerCta}>
            {t('header.cta')}
          </Button>
        </nav>
      </Drawer>
    </header>
  );
};
