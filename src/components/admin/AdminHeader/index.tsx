import {
  BellOutlined,
  MoonOutlined,
  SearchOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Input, Layout, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import type { ThemeMode } from '@/types/theme';
import { resolveAdminNavItem } from '@/utils/adminPageTitle';
import { styles } from './styles';

const { Header } = Layout;

type AdminHeaderProps = Readonly<{
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

export const AdminHeader = ({ themeMode, onThemeToggle }: AdminHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');

  const pageTitleKey = resolveAdminNavItem(location.pathname).labelKey;

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: t('admin.header.profile'),
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

    navigate(`/admin/events?search=${encodeURIComponent(query)}`);
  };

  return (
    <Header className={styles.header}>
      <h1 className={styles.pageTitle}>{t(pageTitleKey)}</h1>

      <div className={styles.searchWrap}>
        <Input
          allowClear
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onPressEnter={(event) => handleSearch(event.currentTarget.value)}
          placeholder={t('admin.header.searchPlaceholder')}
          className={styles.search}
          prefix={<SearchOutlined className={styles.searchIcon} />}
        />
      </div>

      <Space size="middle" className={styles.actions}>
        <Badge count={3} size="small" offset={[-2, 2]}>
          <button type="button" className={styles.iconBtn} aria-label={t('admin.header.notifications')}>
            <BellOutlined />
          </button>
        </Badge>

        <button
          type="button"
          className={styles.iconBtn}
          onClick={onThemeToggle}
          aria-label={t('header.themeToggle')}
        >
          {themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        </button>

        <LanguageSelector variant="admin" />

        <Dropdown menu={userMenu} trigger={['click']}>
          <button type="button" className={styles.avatarBtn} aria-label={t('admin.header.profile')}>
            <Avatar
              size={44}
              icon={<UserOutlined />}
              src="/images/about/hero.webp"
              className={styles.avatar}
            />
          </button>
        </Dropdown>
      </Space>
    </Header>
  );
};
