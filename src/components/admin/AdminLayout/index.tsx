import { Layout } from 'antd';
import { useState, type ReactNode } from 'react';
import '@/styles/admin.css';
import { AdminFooter } from '@/components/admin/AdminFooter';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import type { ThemeMode } from '@/types/theme';
import { styles } from './styles';

const { Sider, Content } = Layout;

type AdminLayoutProps = Readonly<{
  children: ReactNode;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

export const AdminLayout = ({ children, themeMode, onThemeToggle }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={`admin-shell ${styles.adminLayout}`}>
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
        <AdminSidebar collapsed={collapsed} />
      </Sider>

      <Layout className={styles.contentLayout}>
        <AdminHeader themeMode={themeMode} onThemeToggle={onThemeToggle} />
        <Content className={styles.main}>{children}</Content>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};
