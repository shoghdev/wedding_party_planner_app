import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStatusTag } from '@/components/admin/AdminStatusTag';
import type { AdminListSectionConfig } from '@/consts/adminSections';
import { useAdminResource } from '@/hooks/useAdminResource';
import type { AdminListRecord, AdminListSectionKey } from '@/types/admin';
import { styles } from './styles';

type AdminListSectionProps = Readonly<{
  config: AdminListSectionConfig;
}>;

type FormValues = Record<string, string | number | dayjs.Dayjs | null | undefined>;

export const AdminListSection = ({ config }: AdminListSectionProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm<FormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  const resource = useAdminResource({
    section: config.sectionKey as AdminListSectionKey,
    searchFields: config.searchFields as (keyof AdminListRecord)[],
  });

  useEffect(() => {
    const query = searchParams.get('search');

    if (query) {
      resource.setSearch(query);
    }
  }, [searchParams, resource.setSearch]);

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
      });
    }

    if (config.tableColumns.includes('category')) {
      baseColumns.push({
        title: t('admin.table.category'),
        dataIndex: 'category',
        key: 'category',
      });
    }

    if (config.tableColumns.includes('code')) {
      baseColumns.push({
        title: t('admin.table.code'),
        dataIndex: 'code',
        key: 'code',
      });
    }

    if (config.tableColumns.includes('email')) {
      baseColumns.push({
        title: t('admin.table.email'),
        dataIndex: 'email',
        key: 'email',
      });
    }

    if (config.tableColumns.includes('rating')) {
      baseColumns.push({
        title: t('admin.table.rating'),
        dataIndex: 'rating',
        key: 'rating',
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
              form.setFieldsValue(normalizeRecordForForm(record, config));
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
                  onClick: () => resource.deleteItem(record.id),
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
  }, [config, form, resource, t]);

  const handleExport = () => {
    messageApi.success(t('admin.actions.exportSuccess'));
  };

  const handleOpenCreate = () => {
    resource.openCreateModal();
    form.setFieldsValue(config.defaultValues);
  };

  const handleSubmit = (values: FormValues) => {
    const payload = serializeFormValues(values, config);
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

    messageApi.success(
      resource.editingItem ? t('admin.actions.updateSuccess') : t('admin.actions.createSuccess'),
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
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              {t(config.exportLabelKey)}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
              {t(config.createLabelKey)}
            </Button>
          </>
        }
      />

      <div className={styles.filtersCard}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={config.hasStatusFilter ? 12 : 24} lg={8}>
            <Input
              allowClear
              value={resource.search}
              onChange={(event) => resource.setSearch(event.target.value)}
              placeholder={t(config.searchPlaceholderKey)}
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
        <Button type="link" onClick={resource.resetFilters} style={{ paddingInline: 0 }}>
          {t('admin.filters.reset')}
        </Button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableToolbar}>
          <span className={styles.selectionInfo}>
            {t('admin.table.selectedCount', { count: resource.selectedIds.length })}
          </span>
          <Button
            danger
            disabled={!resource.selectedIds.length}
            onClick={resource.deleteSelected}
          >
            {t('admin.actions.bulkDelete')}
          </Button>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={resource.items}
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

      <Modal
        open={resource.isModalOpen}
        title={resource.editingItem ? t('admin.actions.editItem') : t('admin.actions.createItem')}
        onCancel={resource.closeModal}
        onOk={() => form.submit()}
        okText={t('admin.actions.save')}
        cancelText={t('admin.actions.cancel')}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {config.fields.map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={t(field.labelKey)}
              rules={
                field.required
                  ? [{ required: true, message: t('admin.validation.required') }]
                  : undefined
              }
            >
              {renderFieldInput(field.type, field.options, t)}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
};

const renderFieldInput = (
  type: AdminListSectionConfig['fields'][number]['type'],
  options: AdminListSectionConfig['fields'][number]['options'],
  t: (key: string) => string,
) => {
  if (type === 'textarea') {
    return <Input.TextArea rows={4} />;
  }

  if (type === 'number') {
    return <InputNumber min={1} max={5} style={{ width: '100%' }} />;
  }

  if (type === 'date') {
    return <DatePicker style={{ width: '100%' }} />;
  }

  if (type === 'select') {
    return (
      <Select
        options={(options ?? []).map((option) => ({
          value: option.value,
          label: t(option.labelKey),
        }))}
      />
    );
  }

  return <Input />;
};

const normalizeRecordForForm = (
  record: AdminListRecord,
  config: AdminListSectionConfig,
): FormValues => {
  const values: FormValues = { ...config.defaultValues };

  config.fields.forEach((field) => {
    const rawValue = record[field.name as keyof AdminListRecord];

    if (field.type === 'date' && rawValue) {
      values[field.name] = dayjs(String(rawValue));
      return;
    }

    values[field.name] = rawValue as string | number;
  });

  return values;
};

const serializeFormValues = (
  values: FormValues,
  config: AdminListSectionConfig,
): Record<string, string | number> => {
  const payload: Record<string, string | number> = {};

  config.fields.forEach((field) => {
    const value = values[field.name];

    if (field.type === 'date' && value && dayjs.isDayjs(value)) {
      payload[field.name] = value.format('YYYY-MM-DD');
      return;
    }

    payload[field.name] = (value ?? '') as string | number;
  });

  return payload;
};
