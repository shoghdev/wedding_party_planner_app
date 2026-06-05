import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import type { AdminBookingStatus, AdminStatus } from '@/types/admin';

type AdminStatusTagProps = Readonly<{
  status: AdminStatus | AdminBookingStatus;
}>;

const STATUS_COLORS: Record<AdminStatus | AdminBookingStatus, string> = {
  published: 'success',
  draft: 'warning',
  archived: 'processing',
  pending: 'gold',
  confirmed: 'success',
  cancelled: 'error',
};

export const AdminStatusTag = ({ status }: AdminStatusTagProps) => {
  const { t } = useTranslation();

  return (
    <Tag color={STATUS_COLORS[status]}>{t(`admin.status.${status}`)}</Tag>
  );
};
