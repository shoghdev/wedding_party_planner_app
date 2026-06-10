import { Button, Form, Input, Select, Switch, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import type { AdminFieldConfig } from '@/consts/adminSections';
import { styles } from './styles';

type AdminFormValues = Record<string, string | boolean | number | undefined>;

type AdminContentFormProps<T extends AdminFormValues> = Readonly<{
  breadcrumbsKey: string;
  titleKey: string;
  descriptionKey: string;
  fields: readonly AdminFieldConfig[];
  initialValues: T;
  onSubmit: (values: T) => void;
}>;

export const AdminContentForm = <T extends AdminFormValues>({
  breadcrumbsKey,
  titleKey,
  descriptionKey,
  fields,
  initialValues,
  onSubmit,
}: AdminContentFormProps<T>) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<AdminFormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleFinish = (values: AdminFormValues) => {
    onSubmit(values as T);
    messageApi.success(t('admin.actions.updateSuccess'));
  };

  return (
    <>
      {contextHolder}

      <AdminPageHeader
        breadcrumbs={t(breadcrumbsKey)}
        title={t(titleKey)}
        description={t(descriptionKey)}
      />

      <div className={styles.formCard}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {fields.map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={t(field.labelKey)}
              valuePropName={field.type === 'boolean' ? 'checked' : 'value'}
              rules={
                field.required
                  ? [{ required: true, message: t('admin.validation.required') }]
                  : undefined
              }
            >
              {renderInput(field, t)}
            </Form.Item>
          ))}

          <div className={styles.actions}>
            <Button type="primary" htmlType="submit" className="admin-save-btn">
              {t('admin.actions.saveChanges')}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

const renderInput = (field: AdminFieldConfig, t: (key: string) => string) => {
  if (field.type === 'boolean') {
    return <Switch />;
  }

  if (field.type === 'textarea') {
    return <Input.TextArea rows={4} />;
  }

  if (field.type === 'select') {
    return (
      <Select
        options={(field.options ?? []).map((option) => ({
          value: option.value,
          label: t(option.labelKey),
        }))}
      />
    );
  }

  return <Input />;
};
