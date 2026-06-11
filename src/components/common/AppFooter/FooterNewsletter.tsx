import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';
import type { NewsletterSubscribeValues } from '@/types/newsletter';
import { styles } from './styles';

type FooterNewsletterProps = Readonly<{
  showTitle?: boolean;
}>;

export const FooterNewsletter = ({ showTitle = true }: FooterNewsletterProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<NewsletterSubscribeValues>();
  const { submitting, subscribe } = useNewsletterSubscribe();

  const onFinish = async (values: NewsletterSubscribeValues) => {
    const subscribed = await subscribe(values);
    if (subscribed) {
      form.resetFields();
    }
  };

  return (
    <div className={styles.newsletterCol}>
      {showTitle ? (
        <h3 className={styles.columnTitle}>{t('footer.newsletter.title')}</h3>
      ) : null}
      <p className={styles.newsletterText}>{t('footer.newsletter.description')}</p>
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('footer.newsletter.emailRequired') },
            { type: 'email', message: t('footer.newsletter.emailInvalid') },
          ]}
        >
          <Input
            type="email"
            placeholder={t('footer.newsletter.placeholder')}
            size="large"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item className={styles.subscribeItem}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={submitting}
            className={styles.subscribeBtn}
          >
            {t('footer.newsletter.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
