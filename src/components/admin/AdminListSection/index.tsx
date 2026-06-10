import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Grid, Input, Modal, Popconfirm, Row, Select, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { AdminItemEditModal } from '@/components/admin/AdminItemEditModal';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStatusTag } from '@/components/admin/AdminStatusTag';
import type { AdminListSectionConfig } from '@/consts/adminSections';
import { useAdminResource } from '@/hooks/useAdminResource';
import type { AdminListRecord, AdminListSectionKey } from '@/types/admin';
import { downloadCsv } from '@/utils/downloadCsv';
import { styles } from './styles';

const { Search } = Input;
const { useBreakpoint } = Grid;

type AdminListSectionProps = Readonly<{
  config: AdminListSectionConfig;
}>;

export const AdminListSection = ({ config }: AdminListSectionProps) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isCompact = screens.sm === false;
  const [searchParams, setSearchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();

  const resource = useAdminResource({
    section: config.sectionKey as AdminListSectionKey,
    searchFields: config.searchFields as (keyof AdminListRecord)[],
  });

  const urlSearch = searchParams.get('search') ?? '';

  useEffect(() => {
    resource.setSearch(urlSearch);
  }, [urlSearch, resource.setSearch]);

  useEffect(() => {
    const editId = searchParams.get('edit');

    if (!editId || resource.isModalOpen) {
      return;
    }

    const item = resource.allItems.find((entry) => entry.id === editId);

    if (item) {
      resource.openEditModal(item);
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('edit');
    setSearchParams(nextParams, { replace: true });
  }, [resource.allItems, resource.isModalOpen, resource.openEditModal, searchParams, setSearchParams]);

  useEffect(() => {
    if (searchParams.get('create') !== '1' || resource.isModalOpen) {
      return;
    }

    resource.openCreateModal();

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('create');
    setSearchParams(nextParams, { replace: true });
  }, [resource.isModalOpen, resource.openCreateModal, searchParams, setSearchParams]);

  const syncSearchToUrl = (value: string) => {
    resource.setSearch(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set('search', value.trim());
    } else {
      nextParams.delete('search');
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleDeleteItem = (id: string) => {
    resource.deleteItem(id);
    messageApi.success(t('admin.actions.deleteSuccess'));
  };

  const handleBulkDelete = () => {
    resource.deleteSelected();
    messageApi.success(t('admin.actions.bulkDeleteSuccess'));
  };

  const confirmDeleteItem = (id: string) => {
    Modal.confirm({
      title: t('admin.actions.deleteConfirmTitle'),
      content: t('admin.actions.deleteConfirmMessage'),
      okText: t('admin.actions.delete'),
      okButtonProps: { danger: true },
      cancelText: t('admin.actions.cancel'),
      onOk: () => handleDeleteItem(id),
    });
  };

  const handleResetFilters = () => {
    resource.resetFilters();

    if (searchParams.has('search')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('search');
      setSearchParams(nextParams, { replace: true });
    }
  };

  const columns = useMemo<ColumnsType<AdminListRecord>>(() => {
    const baseColumns: ColumnsType<AdminListRecord> = [];

    if (config.tableColumns.includes('detail')) {
      baseColumns.push({
        title: t('admin.table.eventDetail'),
        key: 'detail',
        render: (_, record) => {
          const title = config.getDetailTitle(record as Record<string, unknown>);
          const meta = config.getDetailMeta?.(record as Record<string, unknown>) ?? record.id;
          const imageUrl = config.getImageUrl?.(record as Record<string, unknown>);

          return (
            <div className={styles.detailCell}>
              {imageUrl ? (
                <img src={imageUrl} alt="" className={styles.thumbnail} loading="lazy" />
              ) : null}
              <div>
                <p className={styles.detailTitle}>{title}</p>
                <p className={styles.detailMeta}>{meta}</p>
              </div>
            </div>
          );
        },
      });
    }

    if (config.tableColumns.includes('date')) {
      baseColumns.push({
        title: t('admin.table.dateTime'),
        dataIndex: 'date',
        key: 'date',
        responsive: ['md'],
        render: (_, record) => {
          const dateValue =
            'date' in record
              ? record.date
              : 'eventDate' in record
                ? record.eventDate
                : 'createdAt' in record
                  ? record.createdAt
                  : '';

          return dateValue ? dayjs(String(dateValue)).format('MMM D, YYYY') : '—';
        },
      });
    }

    if (config.tableColumns.includes('location')) {
      baseColumns.push({
        title: t('admin.table.location'),
        dataIndex: 'location',
        key: 'location',
        responsive: ['md'],
      });
    }

    if (config.tableColumns.includes('category')) {
      baseColumns.push({
        title: t('admin.table.category'),
        dataIndex: 'category',
        key: 'category',
        responsive: ['md'],
      });
    }

    if (config.tableColumns.includes('code')) {
      baseColumns.push({
        title: t('admin.table.code'),
        dataIndex: 'code',
        key: 'code',
        responsive: ['sm'],
      });
    }

    if (config.tableColumns.includes('email')) {
      baseColumns.push({
        title: t('admin.table.email'),
        dataIndex: 'email',
        key: 'email',
        responsive: ['md'],
      });
    }

    if (config.tableColumns.includes('rating')) {
      baseColumns.push({
        title: t('admin.table.rating'),
        dataIndex: 'rating',
        key: 'rating',
        responsive: ['md'],
      });
    }

    if (config.tableColumns.includes('status')) {
      baseColumns.push({
        title: t('admin.table.status'),
        key: 'status',
        render: (_, record) =>
          'status' in record ? <AdminStatusTag status={record.status} /> : null,
      });
    }

    baseColumns.push({
      title: t('admin.table.actions'),
      key: 'actions',
      width: 96,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            aria-label={t('admin.actions.edit')}
            onClick={() => {
              resource.openEditModal(record);
            }}
          />
          <Dropdown
            menu={{
              items: [
                {
                  key: 'delete',
                  label: t('admin.actions.delete'),
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => confirmDeleteItem(record.id),
                },
              ],
            }}
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} aria-label={t('admin.actions.more')} />
          </Dropdown>
        </Space>
      ),
    });

    return baseColumns;
  }, [config, resource, t]);

  const clearActionParams = () => {
    if (!searchParams.has('edit') && !searchParams.has('create')) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('edit');
    nextParams.delete('create');
    setSearchParams(nextParams, { replace: true });
  };

  const handleCloseModal = () => {
    resource.closeModal();
    clearActionParams();
  };

  const handleExport = () => {
    const headers = ['ID', ...config.fields.map((field) => t(field.labelKey))];
    const rows = resource.items.map((item) => [
      item.id,
      ...config.fields.map((field) => String(item[field.name as keyof AdminListRecord] ?? '')),
    ]);

    downloadCsv(`${config.sectionKey}-export.csv`, headers, rows);
    messageApi.success(t('admin.actions.exportSuccess'));
  };

  const handleOpenCreate = () => {
    resource.openCreateModal();
  };

  const handleSubmit = (payload: Record<string, string | number>) => {
    const isEditing = Boolean(resource.editingItem);
    const id = resource.editingItem?.id ?? resource.createItemId(config.sectionKey.slice(0, 4));
    const createdAt =
      resource.editingItem && 'createdAt' in resource.editingItem
        ? String(resource.editingItem.createdAt)
        : new Date().toISOString();

    resource.saveItem({
      ...payload,
      id,
      ...(config.sectionKey === 'bookings' ? { createdAt } : {}),
    } as AdminListRecord);

    clearActionParams();

    messageApi.success(
      isEditing ? t('admin.actions.updateSuccess') : t('admin.actions.createSuccess'),
    );
  };

  return (
    <>
      {contextHolder}

      <AdminPageHeader
        breadcrumbs={t(config.breadcrumbsKey)}
        title={t(config.titleKey)}
        description={t(config.descriptionKey)}
        actions={
          <>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExport}
              size={isCompact ? 'small' : 'middle'}
              className={styles.headerActionBtn}
            >
              {t(config.exportLabelKey)}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenCreate}
              size={isCompact ? 'small' : 'middle'}
              className={styles.headerActionBtn}
            >
              {t(config.createLabelKey)}
            </Button>
          </>
        }
      />

      <div className={styles.filtersCard}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={config.hasStatusFilter ? 12 : 24} lg={8}>
            <Search
              allowClear
              value={resource.search}
              onChange={(event) => resource.setSearch(event.target.value)}
              onSearch={syncSearchToUrl}
              onClear={() => syncSearchToUrl('')}
              placeholder={t(config.searchPlaceholderKey)}
              enterButton={isCompact ? <SearchOutlined /> : t('admin.actions.search')}
              size={isCompact ? 'small' : 'middle'}
              className={styles.filterSearch}
            />
          </Col>
          {config.hasStatusFilter ? (
            <Col xs={24} md={12} lg={8}>
              <Select
                value={resource.statusFilter}
                onChange={resource.setStatusFilter}
                style={{ width: '100%' }}
                options={[
                  { value: 'all', label: t('admin.filters.allStatuses') },
                  ...(config.statusOptions ?? []).map((option) => ({
                    value: option.value,
                    label: t(option.labelKey),
                  })),
                ]}
              />
            </Col>
          ) : null}
        </Row>
        <Button type="link" onClick={handleResetFilters} style={{ paddingInline: 0 }}>
          {t('admin.filters.reset')}
        </Button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableToolbar}>
          <span className={styles.selectionInfo}>
            {t('admin.table.selectedCount', { count: resource.selectedIds.length })}
          </span>
          <Popconfirm
            title={t('admin.actions.bulkDeleteConfirmTitle')}
            description={t('admin.actions.bulkDeleteConfirmMessage', {
              count: resource.selectedIds.length,
            })}
            okText={t('admin.actions.delete')}
            cancelText={t('admin.actions.cancel')}
            okButtonProps={{ danger: true }}
            disabled={!resource.selectedIds.length}
            onConfirm={handleBulkDelete}
          >
            <Button danger disabled={!resource.selectedIds.length}>
              {t('admin.actions.bulkDelete')}
            </Button>
          </Popconfirm>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={resource.items}
          scroll={{ x: 'max-content' }}
          rowSelection={{
            selectedRowKeys: resource.selectedIds,
            onChange: (keys) => resource.setSelectedIds(keys as string[]),
          }}
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {t('admin.table.showingCount', {
              visible: resource.items.length,
              total: resource.allItems.length,
            })}
          </p>
        </div>
      </div>

      <AdminItemEditModal
        open={resource.isModalOpen}
        config={config}
        item={resource.editingItem}
        onClose={handleCloseModal}
        onSave={handleSubmit}
      />
    </>
  );
};
