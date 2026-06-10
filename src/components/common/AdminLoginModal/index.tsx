import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import type { AdminLoginFormValues } from '@/types/adminAuth';
import styles from './index.module.css';

type AdminLoginModalProps = Readonly<{
  open: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onSubmit: (values: AdminLoginFormValues) => Promise<void>;
}>;

export const AdminLoginModal = ({
  open,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: AdminLoginModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<AdminLoginFormValues>();

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={t('header.login.title')}
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
      className={styles.modal}
    >
      <p className={styles.description}>{t('header.login.description')}</p>

      {errorMessage ? (
        <Alert type="error" message={errorMessage} showIcon className={styles.alert} />
      ) : null}

      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
        autoComplete="off"
      >
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
            size="large"
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
            size="large"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={isSubmitting}>
          {t('header.login.submit')}
        </Button>
      </Form>
    </Modal>
  );
};
