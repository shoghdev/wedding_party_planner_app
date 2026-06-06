import { Button, Popconfirm, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { AdminContentForm } from '@/components/admin/AdminContentForm';
import { ADMIN_SETTINGS_FIELDS } from '@/consts/adminContentFields';
import { useAdmin } from '@/hooks/useAdmin';

export const AdminSettingsPage = () => {
  const { t } = useTranslation();
  const { state, updateSettings, resetData } = useAdmin();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <AdminContentForm
        breadcrumbsKey="admin.settings.breadcrumbs"
        titleKey="admin.settings.title"
        descriptionKey="admin.settings.description"
        fields={ADMIN_SETTINGS_FIELDS}
        initialValues={state.settings}
        onSubmit={(values) => updateSettings(values)}
      />

      <Space style={{ marginTop: '1rem' }}>
        <Popconfirm
          title={t('admin.settings.resetConfirmTitle')}
          description={t('admin.settings.resetConfirmDescription')}
          onConfirm={async () => {
            await resetData();
            messageApi.success(t('admin.settings.resetSuccess'));
          }}
          okText={t('admin.actions.confirm')}
          cancelText={t('admin.actions.cancel')}
        >
          <Button danger>{t('admin.settings.resetData')}</Button>
        </Popconfirm>
      </Space>
    </>
  );
};
