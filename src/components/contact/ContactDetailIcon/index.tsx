import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import type { ContactDetailKey } from '@/types/contact';
import styles from './index.module.css';

type ContactDetailIconProps = Readonly<{
  detailKey: ContactDetailKey;
}>;

const ICONS: Record<ContactDetailKey, ReactNode> = {
  phone: <PhoneOutlined />,
  email: <MailOutlined />,
  address: <EnvironmentOutlined />,
  hours: <ClockCircleOutlined />,
};

export const ContactDetailIcon = ({ detailKey }: ContactDetailIconProps) => (
  <span className={styles.iconWrap} aria-hidden>
    {ICONS[detailKey]}
  </span>
);
