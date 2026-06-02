import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

type NewsletterValues = Readonly<{
  email: string;
}>;

type FooterNewsletterProps = Readonly<{
  showTitle?: boolean;
}>;

export const FooterNewsletter = ({ showTitle = true }: FooterNewsletterProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<NewsletterValues>();

  const onFinish = (values: NewsletterValues) => {
    form.resetFields();
    void values;
  };

  return (
    <div className={styles.newsletterCol}>
      {showTitle ? (
        <h3 className={styles.columnTitle}>{t('footer.newsletter.title')}</h3>
      ) : null}
      <p className={styles.newsletterText}>{t('footer.newsletter.description')}</p>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('footer.newsletter.emailRequired') },
            { type: 'email', message: t('footer.newsletter.emailInvalid') },
          ]}
        >
          <Input placeholder={t('footer.newsletter.placeholder')} size="large" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block className={styles.subscribeBtn}>
          {t('footer.newsletter.submit')}
        </Button>
      </Form>
    </div>
  );
};
