import {
  AppstoreOutlined,
  MessageOutlined,
  PictureOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AdminStatusTag } from '@/components/admin/AdminStatusTag';
import type { AdminState, AdminStatus } from '@/types/admin';
import { styles } from './styles';

type ContentType = 'all' | 'service' | 'experience' | 'testimonial' | 'gallery';

type DashboardContentRow = Readonly<{
  id: string;
  title: string;
  imageUrl: string;
  type: Exclude<ContentType, 'all'>;
  date: string;
  status: AdminStatus;
  path: string;
}>;

type AdminDashboardContentTableProps = Readonly<{
  state: AdminState;
}>;

const TYPE_ICONS = {
  service: AppstoreOutlined,
  experience: StarOutlined,
  testimonial: MessageOutlined,
  gallery: PictureOutlined,
} as const;

const buildRows = (state: AdminState): DashboardContentRow[] => {
  const serviceRows = state.services.map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    type: 'service' as const,
    date: '2024-01-15',
    status: item.status,
    path: '/admin/services',
  }));

  const experienceRows = state.events.map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    type: 'experience' as const,
    date: item.date,
    status: item.status,
    path: '/admin/events',
  }));

  const testimonialRows = state.testimonials.map((item) => ({
    id: item.id,
    title: item.clientName,
    imageUrl: item.avatarUrl,
    type: 'testimonial' as const,
    date: '2024-02-10',
    status: item.status,
    path: '/admin/testimonials',
  }));

  const galleryRows = state.gallery.map((item) => ({
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl,
    type: 'gallery' as const,
    date: '2024-03-01',
    status: item.status,
    path: '/admin/gallery',
  }));

  return [...serviceRows, ...experienceRows, ...testimonialRows, ...galleryRows].sort(
    (left, right) => dayjs(right.date).valueOf() - dayjs(left.date).valueOf(),
  );
};

export const AdminDashboardContentTable = ({ state }: AdminDashboardContentTableProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [contentType, setContentType] = useState<ContentType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | AdminStatus>('all');

  const rows = useMemo(() => buildRows(state), [state]);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesSearch =
          !search.trim() ||
          row.title.toLowerCase().includes(search.trim().toLowerCase()) ||
          row.id.toLowerCase().includes(search.trim().toLowerCase());
        const matchesType = contentType === 'all' || row.type === contentType;
        const matchesStatus = statusFilter === 'all' || row.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
      }),
    [contentType, rows, search, statusFilter],
  );

  const columns = useMemo<ColumnsType<DashboardContentRow>>(
    () => [
      {
        title: t('admin.dashboard.table.content'),
        key: 'content',
        render: (_, record) => (
          <div className={styles.contentCell}>
            <img src={record.imageUrl} alt="" className={styles.thumbnail} loading="lazy" />
            <div>
              <p className={styles.contentTitle}>{record.title}</p>
              <p className={styles.contentMeta}>{record.id.toUpperCase()}</p>
            </div>
          </div>
        ),
      },
      {
        title: t('admin.dashboard.table.type'),
        key: 'type',
        render: (_, record) => {
          const Icon = TYPE_ICONS[record.type];

          return (
            <span className={[styles.typeBadge, styles[`type_${record.type}`]].join(' ')}>
              <Icon />
              {t(`admin.dashboard.contentTypes.${record.type}`)}
            </span>
          );
        },
      },
      {
        title: t('admin.dashboard.table.date'),
        dataIndex: 'date',
        key: 'date',
        render: (value: string) => dayjs(value).format('MMM D, YYYY'),
      },
      {
        title: t('admin.table.status'),
        key: 'status',
        render: (_, record) => <AdminStatusTag status={record.status} />,
      },
      {
        title: t('admin.table.actions'),
        key: 'actions',
        width: 88,
        render: (_, record) => (
          <Button type="link" onClick={() => navigate(record.path)}>
            {t('admin.actions.edit')}
          </Button>
        ),
      },
    ],
    [navigate, t],
  );

  return (
    <>
      <div className={styles.filtersCard}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <label className={styles.filterLabel}>{t('admin.dashboard.filters.search')}</label>
            <Input
              allowClear
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('admin.header.searchPlaceholder')}
            />
          </Col>
          <Col xs={24} md={12} lg={5}>
            <label className={styles.filterLabel}>{t('admin.dashboard.filters.contentType')}</label>
            <Select
              value={contentType}
              onChange={setContentType}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: t('admin.dashboard.filters.allContent') },
                { value: 'service', label: t('admin.dashboard.contentTypes.service') },
                { value: 'experience', label: t('admin.dashboard.contentTypes.experience') },
                { value: 'testimonial', label: t('admin.dashboard.contentTypes.testimonial') },
                { value: 'gallery', label: t('admin.dashboard.contentTypes.gallery') },
              ]}
            />
          </Col>
          <Col xs={24} md={12} lg={5}>
            <label className={styles.filterLabel}>{t('admin.table.status')}</label>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: t('admin.filters.allStatuses') },
                { value: 'published', label: t('admin.status.published') },
                { value: 'draft', label: t('admin.status.draft') },
                { value: 'archived', label: t('admin.status.archived') },
              ]}
            />
          </Col>
          <Col xs={24} lg={6}>
            <label className={styles.filterLabel}>{t('admin.dashboard.filters.dateRange')}</label>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              options={[{ value: 'all', label: t('admin.dashboard.filters.selectRange') }]}
            />
          </Col>
        </Row>

        <Space className={styles.filterActions}>
          <Button type="default">{t('admin.dashboard.filters.filters')}</Button>
        </Space>
      </div>

      <div className={styles.tableCard}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredRows}
          pagination={{ pageSize: 4, showSizeChanger: false }}
        />
        <p className={styles.footerText}>
          {t('admin.table.showingCount', {
            visible: Math.min(4, filteredRows.length),
            total: filteredRows.length,
          })}
        </p>
      </div>
    </>
  );
};
