import {
  AppstoreOutlined,
  CalendarOutlined,
  DownloadOutlined,
  MessageOutlined,
  PictureOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AdminDashboardContentTable } from '@/components/admin/AdminDashboardContentTable';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { useAdmin } from '@/hooks/useAdmin';
import { styles } from './styles';

export const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useAdmin();

  return (
    <div className={styles.dashboard}>
      <AdminPageHeader
        breadcrumbs={t('admin.dashboard.breadcrumbs')}
        title={t('admin.dashboard.title')}
        description={t('admin.dashboard.description')}
        actions={
          <>
            <Button icon={<DownloadOutlined />} className={styles.outlineBtn}>
              {t('admin.dashboard.exportData')}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className={styles.primaryBtn}
              onClick={() => navigate('/admin/services')}
            >
              {t('admin.dashboard.addNewItem')}
            </Button>
          </>
        }
      />

      <AdminDashboardContentTable state={state} />

      <Row gutter={[16, 16]} className={styles.statsRow}>
        <Col xs={24} sm={12} xl={6}>
          <AdminStatCard
            label={t('admin.dashboard.stats.services')}
            value={String(state.services.length)}
            trend={t('admin.dashboard.stats.servicesTrendPercent')}
            icon={<AppstoreOutlined />}
            accent="rose"
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <AdminStatCard
            label={t('admin.dashboard.stats.testimonials')}
            value={String(state.testimonials.length)}
            trend={t('admin.dashboard.stats.testimonialsTrendPercent')}
            icon={<MessageOutlined />}
            accent="green"
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <AdminStatCard
            label={t('admin.dashboard.stats.bookings')}
            value={String(state.bookings.length)}
            trend={t('admin.dashboard.stats.bookingsTrendPercent')}
            icon={<CalendarOutlined />}
            accent="rose"
          />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <AdminStatCard
            label={t('admin.dashboard.stats.gallery')}
            value={String(state.gallery.length)}
            trend={t('admin.dashboard.stats.galleryTrendPercent')}
            icon={<PictureOutlined />}
            accent="blue"
          />
        </Col>
      </Row>
    </div>
  );
};
