import { CloseOutlined, MailOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Button, FloatButton, Form, Grid, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatWidget } from '@/hooks/useChatWidget';
import type { ChatMessageFormValues } from '@/types/chat';
import styles from './index.module.css';

const { TextArea } = Input;
const { useBreakpoint } = Grid;

export const ChatWidget = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isCompact = !screens.sm;
  const inputSize = !screens.md ? 'small' : isCompact ? 'middle' : 'large';
  const { open, submitting, openWidget, closeWidget, submitMessage } = useChatWidget();
  const [form] = Form.useForm<ChatMessageFormValues>();

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [form, open]);

  const handleToggle = () => {
    if (open) {
      closeWidget();
      return;
    }

    openWidget();
  };

  const handleSubmit = async (values: ChatMessageFormValues) => {
    const sent = await submitMessage(values);

    if (sent) {
      form.resetFields();
    }
  };

  return (
    <div className={styles.root}>
      {open ? (
        <section
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label={t('chat.title')}
        >
          <header className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>{t('chat.title')}</h2>
              <p className={styles.panelDescription}>{t('chat.description')}</p>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={closeWidget}
              aria-label={t('chat.close')}
              className={styles.closeButton}
            />
          </header>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            autoComplete="off"
            className={styles.form}
          >
            <Form.Item
              name="name"
              label={t('chat.name')}
              rules={[{ required: true, message: t('chat.nameRequired') }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t('chat.namePlaceholder')}
                autoComplete="name"
                size={inputSize}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={t('chat.email')}
              rules={[
                { required: true, message: t('chat.emailRequired') },
                { type: 'email', message: t('chat.emailInvalid') },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={t('chat.emailPlaceholder')}
                autoComplete="email"
                size={inputSize}
              />
            </Form.Item>

            <Form.Item
              name="message"
              label={t('chat.message')}
              rules={[{ required: true, message: t('chat.messageRequired') }]}
            >
              <TextArea
                placeholder={t('chat.messagePlaceholder')}
                rows={isCompact ? 3 : 4}
                maxLength={2000}
                showCount
                size={inputSize}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block size={inputSize} loading={submitting}>
              {t('chat.send')}
            </Button>
          </Form>
        </section>
      ) : null}

      <FloatButton
        type="primary"
        icon={<MessageOutlined />}
        tooltip={t('chat.toggle')}
        onClick={handleToggle}
        className={styles.floatButton}
        aria-label={t('chat.toggle')}
      />
    </div>
  );
};
