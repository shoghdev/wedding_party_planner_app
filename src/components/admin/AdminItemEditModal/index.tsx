import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminListSectionConfig } from '@/consts/adminSections';
import type { AdminListRecord } from '@/types/admin';

type FormValues = Record<string, string | number | dayjs.Dayjs | null | undefined>;

type AdminItemEditModalProps = Readonly<{
  open: boolean;
  config: AdminListSectionConfig;
  item: AdminListRecord | null;
  onClose: () => void;
  onSave: (payload: Record<string, string | number>) => void;
}>;

export const AdminItemEditModal = ({
  open,
  config,
  item,
  onClose,
  onSave,
}: AdminItemEditModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (!open) {
      return;
    }

    if (item) {
      form.setFieldsValue(normalizeRecordForForm(item, config));
      return;
    }

    form.setFieldsValue(config.defaultValues);
  }, [config, form, item, open]);

  const handleSubmit = (values: FormValues) => {
    onSave(serializeFormValues(values, config));
  };

  return (
    <Modal
      open={open}
      title={item ? t('admin.actions.editItem') : t('admin.actions.createItem')}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={t('admin.actions.save')}
      cancelText={t('admin.actions.cancel')}
      destroyOnHidden
      width="min(100%, 32rem)"
      centered
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
