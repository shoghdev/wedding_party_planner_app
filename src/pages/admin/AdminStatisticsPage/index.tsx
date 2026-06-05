import { AdminListSection } from '@/components/admin/AdminListSection';
import { ADMIN_STATISTICS_CONFIG } from '@/consts/adminSectionConfigs';

export const AdminStatisticsPage = () => (
  <AdminListSection config={ADMIN_STATISTICS_CONFIG} />
);
