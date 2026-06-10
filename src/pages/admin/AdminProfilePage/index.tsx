import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Space, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { isLocalAdminAuthConfigured } from '@/config/adminAuth';
import { ADMIN_PROFILE_FIELDS } from '@/consts/adminContentFields';
import { useAdmin } from '@/hooks/useAdmin';
import { useAdminAuth } from '@/store/AdminAuthProvider';
import type { AdminProfile } from '@/types/admin';
import { styles } from './styles';

type ProfileFormValues = AdminProfile;

export const AdminProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm<ProfileFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const { state, updateProfile } = useAdmin();
  const { userEmail, signOut } = useAdminAuth();

  useEffect(() => {
    form.setFieldsValue(state.profile);
  }, [form, state.profile]);

  const handleFinish = (values: ProfileFormValues) => {
    updateProfile(values);
    messageApi.success(t('admin.actions.updateSuccess'));
  };

  const handleSignOut = async () => {
    if (isLocalAdminAuthConfigured()) {
      await signOut();
      navigate('/admin/login');
      return;
    }

    navigate('/');
  };

  const accountEmail = userEmail ?? state.settings.supportEmail;

  return (
    <>
      {contextHolder}

      <AdminPageHeader
        breadcrumbs={t('admin.profile.breadcrumbs')}
        title={t('admin.profile.title')}
        description={t('admin.profile.description')}
      />

      <div className={styles.profileCard}>
        <div className={styles.summary}>
          <Avatar
            size={88}
            icon={<UserOutlined />}
            src={state.profile.avatarUrl}
            className={styles.avatar}
          />
          <div>
            <h2 className={styles.displayName}>{state.profile.displayName}</h2>
            <p className={styles.jobTitle}>{state.profile.jobTitle}</p>
            <p className={styles.email}>{accountEmail}</p>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label={t('admin.fields.email')}>
            <Input value={accountEmail} disabled />
          </Form.Item>

          {ADMIN_PROFILE_FIELDS.map((field) => (
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
              {field.type === 'textarea' ? <Input.TextArea rows={4} /> : <Input />}
            </Form.Item>
          ))}

          <Space className={styles.actions}>
            <Button danger icon={<LogoutOutlined />} onClick={() => void handleSignOut()}>
              {t('admin.profile.signOut')}
            </Button>
            <Button type="primary" htmlType="submit" className={`admin-save-btn ${styles.saveBtn}`}>
              {t('admin.actions.saveChanges')}
            </Button>
          </Space>
        </Form>
      </div>
    </>
  );
};
