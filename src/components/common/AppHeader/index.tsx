import { LoginOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { AdminLoginModal } from '@/components/common/AdminLoginModal';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useHeaderAdminLogin } from '@/hooks/useHeaderAdminLogin';
import type { ThemeMode } from '@/types/theme';
import { getActiveNavKey, NAV_ITEMS } from './consts';
import { styles } from './styles';

type AppHeaderProps = Readonly<{
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

const isRoutePath = (href: string) => href.startsWith('/') && !href.includes('#');

export const AppHeader = ({ themeMode, onThemeToggle }: AppHeaderProps) => {
  const { t } = useTranslation();
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeNavKey = getActiveNavKey(pathname, hash);
  const {
    isLoginAvailable,
    isOpen: isLoginOpen,
    isSubmitting: isLoginSubmitting,
    errorMessage: loginErrorMessage,
    openLogin,
    closeLogin,
    submitLogin,
  } = useHeaderAdminLogin();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClass = [styles.header, scrolled && styles.headerScrolled]
    .filter(Boolean)
    .join(' ');

  const navLinkClass = (key: string) =>
    [styles.navLink, key === activeNavKey && styles.navLinkActive].filter(Boolean).join(' ');

  const renderNavLink = (item: (typeof NAV_ITEMS)[number]) => {
    const label = t(`header.nav.${item.key}`);
    const className = navLinkClass(item.key);

    if (isRoutePath(item.href)) {
      return (
        <Link key={item.key} to={item.href} className={className}>
          {label}
        </Link>
      );
    }

    return (
      <a key={item.key} href={item.href} className={className}>
        {label}
      </a>
    );
  };

  return (
    <header className={headerClass}>
      <div className={styles.headerContainer}>
        <div className={styles.mainBar}>
          <div className={styles.brandCluster}>
            <div className={styles.logoSlot}>
              <Logo tone="header" />
            </div>
            <div className={styles.mobileQuickActions}>
              {isLoginAvailable ? (
                <button
                  type="button"
                  className={styles.loginBtn}
                  onClick={openLogin}
                  aria-label={t('header.login.button')}
                >
                  <LoginOutlined />
                </button>
              ) : null}
              <div className={styles.mobileLanguage}>
                <LanguageSelector variant="header" />
              </div>
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

          <nav className={styles.nav} aria-label={t('header.mainNav')}>
            {NAV_ITEMS.map(renderNavLink)}
          </nav>

          <div className={styles.actions}>
            <div className={styles.utilities}>
              <div className={styles.themeToggleWrap}>
                <ThemeToggle mode={themeMode} onToggle={onThemeToggle} variant="header" />
              </div>
              <div className={styles.desktopLanguage}>
                <LanguageSelector variant="header" />
              </div>
            </div>
            <Link to="/booking">
              <Button type="primary" size="middle" className={styles.ctaBtn}>
                {t('header.cta')}
              </Button>
            </Link>
            {isLoginAvailable ? (
              <button
                type="button"
                className={[styles.loginBtn, styles.desktopLoginBtn].join(' ')}
                onClick={openLogin}
                aria-label={t('header.login.button')}
              >
                <LoginOutlined />
              </button>
            ) : null}
          </div>
        </div>
      </div>

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
        <nav className={styles.drawerNav} aria-label={t('header.mobileNav')}>
          {NAV_ITEMS.map((item) => {
            const className = [
              styles.drawerNavLink,
              item.key === activeNavKey && styles.drawerNavLinkActive,
            ]
              .filter(Boolean)
              .join(' ');

            if (isRoutePath(item.href)) {
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={className}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`header.nav.${item.key}`)}
                </Link>
              );
            }

            return (
              <a
                key={item.key}
                href={item.href}
                className={className}
                onClick={() => setMenuOpen(false)}
              >
                {t(`header.nav.${item.key}`)}
              </a>
            );
          })}
          <div className={styles.drawerCtaGroup}>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>
              <Button type="primary" block size="large" className={styles.drawerCta}>
                {t('header.cta')}
              </Button>
            </Link>
            {isLoginAvailable ? (
              <button
                type="button"
                className={styles.drawerLoginBtn}
                onClick={openLogin}
                aria-label={t('header.login.button')}
              >
                <LoginOutlined />
              </button>
            ) : null}
          </div>
        </nav>
      </Drawer>

      <AdminLoginModal
        open={isLoginOpen}
        isSubmitting={isLoginSubmitting}
        errorMessage={loginErrorMessage}
        onClose={closeLogin}
        onSubmit={submitLogin}
      />
    </header>
  );
};
