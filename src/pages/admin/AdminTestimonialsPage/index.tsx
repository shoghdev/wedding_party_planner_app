import { AdminListSection } from '@/components/admin/AdminListSection';
import { ADMIN_TESTIMONIALS_CONFIG } from '@/consts/adminSectionConfigs';

export const AdminTestimonialsPage = () => (
  <AdminListSection config={ADMIN_TESTIMONIALS_CONFIG} />
);
