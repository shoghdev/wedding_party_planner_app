import {
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Button, Empty } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { AdminNotification } from '@/types/adminNotification';
import { styles } from './styles';

dayjs.extend(relativeTime);

type AdminNotificationPanelProps = Readonly<{
  notifications: AdminNotification[];
  isUnread: (notification: AdminNotification) => boolean;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: AdminNotification) => void;
  onClose: () => void;
  variant?: 'popover' | 'drawer';
}>;

const NOTIFICATION_ICONS = {
  pendingBooking: ClockCircleOutlined,
  draftContent: FileTextOutlined,
  upcomingEvent: CalendarOutlined,
} as const;

export const AdminNotificationPanel = ({
  notifications,
  isUnread,
  onMarkAllAsRead,
  onNotificationClick,
  onClose,
  variant = 'popover',
}: AdminNotificationPanelProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (notification: AdminNotification) => {
    onNotificationClick(notification);
    navigate(notification.path);
    onClose();
  };

  const getMessage = (notification: AdminNotification) => {
    const values = { ...notification.messageValues };

    if (notification.kind === 'draftContent' && values.type) {
      values.type = t(`admin.notifications.types.${values.type}`);
    }

    return t(notification.messageKey, values);
  };

  return (
    <div className={[styles.panel, variant === 'drawer' ? styles.panelDrawer : ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('admin.notifications.title')}</h2>
        {notifications.length > 0 ? (
          <Button type="link" className={styles.markAllBtn} onClick={onMarkAllAsRead}>
            {t('admin.notifications.markAllRead')}
          </Button>
        ) : null}
      </div>

      {notifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t('admin.notifications.empty')}
          className={styles.empty}
        />
      ) : (
        <ul className={styles.list}>
          {notifications.map((notification) => {
            const Icon = NOTIFICATION_ICONS[notification.kind];
            const unread = isUnread(notification);

            return (
              <li key={notification.id}>
                <button
                  type="button"
                  className={[styles.item, unread ? styles.itemUnread : ''].join(' ')}
                  onClick={() => handleClick(notification)}
                >
                  <span className={styles.itemIcon} aria-hidden>
                    <Icon />
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemTitle}>{t(notification.titleKey)}</span>
                    <span className={styles.itemMessage}>{getMessage(notification)}</span>
                    <span className={styles.itemTime}>{dayjs(notification.createdAt).fromNow()}</span>
                  </span>
                  {unread ? <span className={styles.unreadDot} aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
