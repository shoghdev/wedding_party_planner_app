import {
  BarChartOutlined,
  CalendarOutlined,
  DashboardOutlined,
  GiftOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  PhoneOutlined,
  PictureOutlined,
  SettingOutlined,
  StarOutlined,
  TableOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

const ICON_MAP: Record<string, ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  HomeOutlined: <HomeOutlined />,
  InfoCircleOutlined: <InfoCircleOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  StarOutlined: <StarOutlined />,
  PictureOutlined: <PictureOutlined />,
  MessageOutlined: <MessageOutlined />,
  PhoneOutlined: <PhoneOutlined />,
  CalendarOutlined: <CalendarOutlined />,
  GiftOutlined: <GiftOutlined />,
  BarChartOutlined: <BarChartOutlined />,
  TableOutlined: <TableOutlined />,
  SettingOutlined: <SettingOutlined />,
};

export const getAdminNavIcon = (iconName: string) => ICON_MAP[iconName] ?? <DashboardOutlined />;
