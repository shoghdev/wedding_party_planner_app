import {

  CustomerServiceOutlined,

  LogoutOutlined,

  PlusOutlined,

} from '@ant-design/icons';

import { Button, Menu } from 'antd';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useLocation, useNavigate } from 'react-router-dom';

import { AdminBrandLogo } from '@/components/admin/AdminBrandLogo';
import { AdminSupportModal } from '@/components/admin/AdminSupportModal';

import { ADMIN_NAV_ITEMS } from '@/consts/adminNav';

import { getAdminNavIcon } from '@/utils/adminNavIcons';

import { useAdminAuth } from '@/store/AdminAuthProvider';
import { isLocalAdminAuthConfigured } from '@/config/adminAuth';

import { styles } from './styles';



type AdminSidebarProps = Readonly<{
  collapsed: boolean;
  onNavigate?: () => void;
}>;

export const AdminSidebar = ({ collapsed, onNavigate }: AdminSidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAdminAuth();
  const [isSupportOpen, setIsSupportOpen] = useState(false);



  const selectedKey =
    location.pathname === '/admin/profile'
      ? ''
      : (ADMIN_NAV_ITEMS.find(
          (item) =>
            item.path === location.pathname ||
            (item.path !== '/admin' && location.pathname.startsWith(item.path)),
        )?.key ?? 'dashboard');



  const handleLogout = async () => {
    if (isLocalAdminAuthConfigured()) {
      await signOut();
      navigate('/admin/login');
      return;
    }

    navigate('/');
  };

  const menuItems = ADMIN_NAV_ITEMS.map((item) => ({
    key: item.key,
    icon: getAdminNavIcon(item.icon),
    label: t(item.labelKey),
    onClick: () => {
      navigate(item.path);
      onNavigate?.();
    },
  }));



  return (

    <div className={styles.sidebarInner}>

      <AdminBrandLogo collapsed={collapsed} />



      <Menu

        mode="inline"

        selectedKeys={[selectedKey]}

        items={menuItems}

        className={styles.menu}

      />



      <div className={styles.footer}>

        <Button

          type="primary"

          icon={<PlusOutlined />}

          className={styles.addContentBtn}

          onClick={() => {
            navigate('/admin?create=1');
            onNavigate?.();
          }}

        >

          {!collapsed ? t('admin.sidebar.addContent') : null}

        </Button>



        {!collapsed ? (
          <div className={styles.footerLinks}>
            <button type="button" className={styles.footerLink} onClick={() => setIsSupportOpen(true)}>
              <CustomerServiceOutlined />
              {t('admin.sidebar.support')}
            </button>
            <button
              type="button"
              className={styles.footerLink}
              onClick={() => void handleLogout()}
            >
              <LogoutOutlined />
              {t('admin.sidebar.logout')}
            </button>
          </div>
        ) : (
          <div className={styles.footerLinksCollapsed}>
            <button
              type="button"
              className={styles.footerIconBtn}
              aria-label={t('admin.sidebar.support')}
              onClick={() => setIsSupportOpen(true)}
            >
              <CustomerServiceOutlined />
            </button>
            <button
              type="button"
              className={styles.footerIconBtn}
              aria-label={t('admin.sidebar.logout')}
              onClick={() => void handleLogout()}
            >
              <LogoutOutlined />
            </button>
          </div>
        )}

      </div>

      <AdminSupportModal open={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

    </div>

  );

};


