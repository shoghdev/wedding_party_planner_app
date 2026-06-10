import {
  AppstoreOutlined,
  MessageOutlined,
  PictureOutlined,
  SearchOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Col, Grid, Input, Row, Select, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { AdminItemEditModal } from '@/components/admin/AdminItemEditModal';
import { AdminStatusTag } from '@/components/admin/AdminStatusTag';
import { DASHBOARD_CONTENT_CONFIG } from '@/consts/adminDashboardContent';
import type { DashboardContentType } from '@/consts/adminDashboardContent';
import { useAdmin } from '@/hooks/useAdmin';
import type { AdminListRecord, AdminState } from '@/types/admin';
import { buildDashboardContentRows, type DashboardContentRow } from '@/utils/buildDashboardContentRows';
import {
  getDashboardYearFilters,
  matchesDashboardDateRange,
  type DateRangeFilter,
} from '@/utils/dashboardDateRange';
import { styles } from './styles';

const { useBreakpoint } = Grid;

type ContentType = 'all' | DashboardContentType;

type AdminDashboardContentTableProps = Readonly<{
  state: AdminState;
  initialSearch?: string;
}>;

const TYPE_ICONS = {
  service: AppstoreOutlined,
  experience: StarOutlined,
  testimonial: MessageOutlined,
  gallery: PictureOutlined,
} as const;

const findRecord = (state: AdminState, row: DashboardContentRow): AdminListRecord | null => {
  const { sectionKey } = DASHBOARD_CONTENT_CONFIG[row.type];
  const items = state[sectionKey] as AdminListRecord[];

  return items.find((item) => item.id === row.id) ?? null;
};

export const AdminDashboardContentTable = ({
  state,
  initialSearch = '',
}: AdminDashboardContentTableProps) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isCompact = screens.sm === false;
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateItem } = useAdmin();
  const [messageApi, contextHolder] = message.useMessage();
  const [search, setSearch] = useState(initialSearch);
  const [contentType, setContentType] = useState<ContentType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | DashboardContentRow['status']>('all');
  const [dateRange, setDateRange] = useState<DateRangeFilter>('all');
  const [editingRow, setEditingRow] = useState<DashboardContentRow | null>(null);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const rows = useMemo(() => buildDashboardContentRows(state), [state]);
  const editingRecord = useMemo(
    () => (editingRow ? findRecord(state, editingRow) : null),
    [editingRow, state],
  );
  const editingConfig = editingRow ? DASHBOARD_CONTENT_CONFIG[editingRow.type] : null;

  const dateRangeOptions = useMemo(
    () => [
      { value: 'all' as const, label: t('admin.dashboard.filters.allTime') },
      { value: 'last30' as const, label: t('admin.dashboard.filters.last30Days') },
      { value: 'last90' as const, label: t('admin.dashboard.filters.last90Days') },
      { value: 'thisYear' as const, label: t('admin.dashboard.filters.thisYear') },
      { value: 'lastYear' as const, label: t('admin.dashboard.filters.lastYear') },
      ...getDashboardYearFilters(rows).map((value) => ({
        value,
        label: value.slice(5),
      })),
    ],
    [rows, t],
  );

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesSearch =
          !search.trim() ||
          row.title.toLowerCase().includes(search.trim().toLowerCase()) ||
          row.id.toLowerCase().includes(search.trim().toLowerCase());
        const matchesType = contentType === 'all' || row.type === contentType;
        const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
        const matchesDate = matchesDashboardDateRange(row.date, dateRange);

        return matchesSearch && matchesType && matchesStatus && matchesDate;
      }),
    [contentType, dateRange, rows, search, statusFilter],
  );

  const handleSave = (payload: Record<string, string | number>) => {
    if (!editingRow || !editingRecord || !editingConfig) {
      return;
    }

    updateItem(editingConfig.sectionKey, {
      ...editingRecord,
      ...payload,
    } as AdminListRecord);
    setEditingRow(null);
    messageApi.success(t('admin.actions.updateSuccess'));
  };

  const handleResetFilters = () => {
    setSearch('');
    setContentType('all');
    setStatusFilter('all');
    setDateRange('all');

    if (searchParams.has('search')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('search');
      setSearchParams(nextParams, { replace: true });
    }
  };

  const columns = useMemo<ColumnsType<DashboardContentRow>>(
    () => [
      {
        title: t('admin.dashboard.table.content'),
        key: 'content',
        render: (_, record) => (
          <div className={styles.contentCell}>
            {record.imageUrl ? (
              <img src={record.imageUrl} alt="" className={styles.thumbnail} loading="lazy" />
            ) : (
              <div className={styles.thumbnailPlaceholder} aria-hidden />
            )}
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
        responsive: ['md'],
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
        responsive: ['sm'],
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
          <Button type="link" onClick={() => setEditingRow(record)}>
            {t('admin.actions.edit')}
          </Button>
        ),
      },
    ],
    [t],
  );

  return (
    <>
      {contextHolder}

      <div className={styles.filtersCard}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <label className={styles.filterLabel}>{t('admin.dashboard.filters.search')}</label>
            <Input.Search
              allowClear
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onSearch={setSearch}
              placeholder={t('admin.header.searchPlaceholder')}
              enterButton={<SearchOutlined />}
              size={isCompact ? 'small' : 'middle'}
              className={styles.filterSearch}
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
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '100%' }}
              options={dateRangeOptions}
            />
          </Col>
        </Row>

        <Button type="link" onClick={handleResetFilters} className={styles.resetFiltersBtn}>
          {t('admin.filters.reset')}
        </Button>
      </div>

      <div className={styles.tableCard}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredRows}
          scroll={{ x: isCompact ? 480 : 720 }}
          pagination={{
            pageSize: 4,
            showSizeChanger: false,
            showTotal: (total, range) =>
              t('admin.table.showingCount', {
                visible: range[1] - range[0] + 1,
                total,
              }),
          }}
        />
      </div>

      {editingConfig ? (
        <AdminItemEditModal
          open={Boolean(editingRow && editingRecord)}
          config={editingConfig.config}
          item={editingRecord}
          onClose={() => setEditingRow(null)}
          onSave={handleSave}
        />
      ) : null}
    </>
  );
};
