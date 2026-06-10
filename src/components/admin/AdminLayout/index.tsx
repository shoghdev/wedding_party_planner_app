import { Drawer, Grid, Layout } from 'antd';
import { useEffect, useState, type ReactNode } from 'react';
import '@/styles/admin.css';
import { AdminFooter } from '@/components/admin/AdminFooter';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import type { ThemeMode } from '@/types/theme';
import { styles } from './styles';

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

type AdminLayoutProps = Readonly<{
  children: ReactNode;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

export const AdminLayout = ({ children, themeMode, onThemeToggle }: AdminLayoutProps) => {
  const screens = useBreakpoint();
  const isMobile =
    typeof screens.lg === 'boolean'
      ? !screens.lg
      : typeof window !== 'undefined' && window.matchMedia('(max-width: 991px)').matches;
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Layout className={`admin-shell ${styles.adminLayout}`}>
      {!isMobile ? (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          width={248}
          collapsedWidth={80}
          className={styles.sidebar}
          theme="light"
        >
          <AdminSidebar collapsed={collapsed} onNavigate={handleCloseMobileMenu} />
        </Sider>
      ) : (
        <Drawer
          placement="left"
          open={mobileMenuOpen}
          onClose={handleCloseMobileMenu}
          width={280}
          className={styles.mobileDrawer}
          styles={{ body: { padding: 0 } }}
        >
          <AdminSidebar collapsed={false} onNavigate={handleCloseMobileMenu} />
        </Drawer>
      )}

      <Layout className={styles.contentLayout}>
        <AdminHeader
          themeMode={themeMode}
          onThemeToggle={onThemeToggle}
          showMenuToggle={isMobile}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />
        <Content className={styles.main}>{children}</Content>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

