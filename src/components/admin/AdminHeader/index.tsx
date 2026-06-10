import {
  BellOutlined,
  MenuOutlined,
  MoonOutlined,
  SearchOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Drawer, Dropdown, Grid, Input, Layout, Popover, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminNotificationPanel } from '@/components/admin/AdminNotificationPanel';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { useAdmin } from '@/hooks/useAdmin';
import { useAdminNotifications } from '@/hooks/useAdminNotifications';
import type { AdminNotification } from '@/types/adminNotification';
import type { ThemeMode } from '@/types/theme';
import { resolveAdminPageTitleKey } from '@/utils/adminPageTitle';
import { resolveAdminSearchTarget } from '@/utils/resolveAdminSearchTarget';
import { styles } from './styles';

const { Header } = Layout;
const { Search } = Input;
const { useBreakpoint } = Grid;

type AdminHeaderProps = Readonly<{
  themeMode: ThemeMode;
  onThemeToggle: () => void;
  showMenuToggle?: boolean;
  onMenuToggle?: () => void;
}>;

export const AdminHeader = ({
  themeMode,
  onThemeToggle,
  showMenuToggle = false,
  onMenuToggle,
}: AdminHeaderProps) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isCompact = screens.sm === false;
  const isCompactSearch = screens.lg === false;
  const isMobileNotifications = screens.md === false;
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { state } = useAdmin();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isUnread,
  } = useAdminNotifications();

  const pageTitleKey = resolveAdminPageTitleKey(location.pathname);

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: t('admin.header.profile'),
        onClick: () => navigate('/admin/profile'),
      },
      {
        key: 'settings',
        label: t('admin.header.accountSettings'),
        onClick: () => navigate('/admin/settings'),
      },
      {
        key: 'website',
        label: t('admin.header.viewWebsite'),
        onClick: () => navigate('/'),
      },
    ],
  };

  const handleSearch = (value: string) => {
    const query = value.trim();

    if (!query) {
      return;
    }

    navigate(resolveAdminSearchTarget(query, state));
  };

  const handleNotificationClick = (notification: AdminNotification) => {
    markAsRead(notification.id);
  };

  const notificationPanel = (
    <AdminNotificationPanel
      notifications={notifications}
      isUnread={isUnread}
      onMarkAllAsRead={markAllAsRead}
      onNotificationClick={handleNotificationClick}
      onClose={() => setIsNotificationsOpen(false)}
      variant={isMobileNotifications ? 'drawer' : 'popover'}
    />
  );

  const notificationTrigger = (
    <Badge count={unreadCount} size="small" offset={[-2, 2]}>
      <button
        type="button"
        className={styles.iconBtn}
        aria-label={t('admin.header.notifications')}
        onClick={isMobileNotifications ? () => setIsNotificationsOpen(true) : undefined}
      >
        <BellOutlined />
      </button>
    </Badge>
  );

  return (
    <Header className={styles.header}>
      <div className={styles.titleRow}>
        {showMenuToggle ? (
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={t('header.menuToggle')}
            onClick={onMenuToggle}
          >
            <MenuOutlined />
          </button>
        ) : null}
        <h1 className={styles.pageTitle}>{t(pageTitleKey)}</h1>
      </div>

      <div className={styles.searchWrap}>
        <Search
          allowClear
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onSearch={handleSearch}
          placeholder={t('admin.header.searchPlaceholder')}
          size={isCompactSearch ? 'small' : 'middle'}
          enterButton={<SearchOutlined />}
        />
      </div>

      <Space size={isCompact ? 'small' : 'middle'} className={styles.actions}>
        {isMobileNotifications ? (
          <>
            {notificationTrigger}
            <Drawer
              open={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              placement="bottom"
              height="85%"
              className={styles.notificationsDrawer}
              closable
              destroyOnHidden
            >
              {notificationPanel}
            </Drawer>
          </>
        ) : (
          <Popover
            trigger="click"
            placement="bottomRight"
            open={isNotificationsOpen}
            onOpenChange={setIsNotificationsOpen}
            content={notificationPanel}
          >
            {notificationTrigger}
          </Popover>
        )}

        <button
          type="button"
          className={styles.iconBtn}
          onClick={onThemeToggle}
          aria-label={t('header.themeToggle')}
        >
          {themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        </button>

        <LanguageSelector variant="admin" compact={isCompact} />

        <Dropdown menu={userMenu} trigger={['click']}>
          <button type="button" className={styles.avatarBtn} aria-label={t('admin.header.profile')}>
            <Avatar
              size={isCompact ? 36 : 44}
              icon={<UserOutlined />}
              src={state.profile.avatarUrl}
              className={styles.avatar}
            />
          </button>
        </Dropdown>
      </Space>
    </Header>
  );
};

