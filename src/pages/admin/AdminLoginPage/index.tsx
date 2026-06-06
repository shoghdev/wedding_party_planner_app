import '@/styles/admin.css';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminBrandLogo } from '@/components/admin/AdminBrandLogo';
import { useAdminAuth } from '@/store/AdminAuthProvider';
import { styles } from './styles';

type LoginFormValues = Readonly<{
  email: string;
  password: string;
}>;

export const AdminLoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAdminAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath =
    typeof location.state === 'object' &&
    location.state !== null &&
    'from' in location.state &&
    typeof location.state.from === 'string'
      ? location.state.from
      : '/admin';

  const handleFinish = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signIn(values.email, values.password);
      navigate(redirectPath, { replace: true });
    } catch {
      setErrorMessage(t('admin.login.invalidCredentials'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <AdminBrandLogo />

        <Typography.Title level={3} className={styles.title}>
          {t('admin.login.title')}
        </Typography.Title>

        <Typography.Paragraph className={styles.description}>
          {t('admin.login.description')}
        </Typography.Paragraph>

        {errorMessage ? (
          <Alert type="error" message={errorMessage} showIcon className={styles.alert} />
        ) : null}

        <Form layout="vertical" onFinish={handleFinish} requiredMark={false}>
          <Form.Item
            name="email"
            label={t('admin.login.email')}
            rules={[
              { required: true, message: t('admin.validation.required') },
              { type: 'email', message: t('admin.login.emailInvalid') },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={t('admin.login.emailPlaceholder')}
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('admin.login.password')}
            rules={[{ required: true, message: t('admin.validation.required') }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('admin.login.passwordPlaceholder')}
              autoComplete="current-password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            {t('admin.login.submit')}
          </Button>
        </Form>
      </div>
    </div>
  );
};
