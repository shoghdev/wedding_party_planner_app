import {
  AppstoreOutlined,
  CalendarOutlined,
  DownloadOutlined,
  MessageOutlined,
  PictureOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Col, Grid, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { AdminCreateContentModal } from '@/components/admin/AdminCreateContentModal';
import { AdminDashboardContentTable } from '@/components/admin/AdminDashboardContentTable';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { useAdmin } from '@/hooks/useAdmin';
import { buildDashboardContentRows } from '@/utils/buildDashboardContentRows';
import { downloadCsv } from '@/utils/downloadCsv';
import { styles } from './styles';

const { useBreakpoint } = Grid;

export const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isCompact = screens.sm === false;
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { state } = useAdmin();

  useEffect(() => {
    if (searchParams.get('create') === '1') {
      setIsCreateOpen(true);

      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('create');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  const handleExportData = () => {
    const rows = buildDashboardContentRows(state);

    downloadCsv(
      'dashboard-content.csv',
      [
        t('admin.dashboard.table.content'),
        t('admin.dashboard.table.type'),
        t('admin.dashboard.table.date'),
        t('admin.table.status'),
        'ID',
      ],
      rows.map((row) => [
        row.title,
        t(`admin.dashboard.contentTypes.${row.type}`),
        row.date,
        row.status,
        row.id,
      ]),
    );

    messageApi.success(t('admin.actions.exportSuccess'));
  };

  return (
    <div className={styles.dashboard}>
      {contextHolder}
      <AdminPageHeader
        breadcrumbs={t('admin.dashboard.breadcrumbs')}
        title={t('admin.dashboard.title')}
        description={t('admin.dashboard.description')}
        actions={
          <>
            <Button
              icon={<DownloadOutlined />}
              className={styles.outlineBtn}
              onClick={handleExportData}
              size={isCompact ? 'small' : 'middle'}
            >
              {t('admin.dashboard.exportData')}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className={styles.primaryBtn}
              onClick={() => setIsCreateOpen(true)}
              size={isCompact ? 'small' : 'middle'}
            >
              {t('admin.dashboard.addNewItem')}
            </Button>
          </>
        }
      />

      <div className={styles.dashboardTableSection}>
        <AdminDashboardContentTable
          state={state}
          initialSearch={searchParams.get('search') ?? ''}
        />
      </div>

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

      <AdminCreateContentModal open={isCreateOpen} onClose={handleCloseCreate} />
    </div>
  );
};
