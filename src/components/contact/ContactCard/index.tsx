import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { ContactDetailIcon } from '@/components/contact/ContactDetailIcon';
import { CONTACT_DECOR_IMAGE_URL, CONTACT_DETAILS } from '@/api/mocks/contact';
import { useContactForm } from '@/hooks/useContactForm';
import type { ContactFormValues } from '@/types/contact';
import styles from './index.module.css';

const { TextArea } = Input;

export const ContactCard = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<ContactFormValues>();
  const { submitting, onFinish } = useContactForm();

  const handleFinish = async (values: ContactFormValues) => {
    const sent = await onFinish(values);
    if (sent) {
      form.resetFields();
    }
  };

  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <PageContainer>
        <div className={styles.card}>
          <Row gutter={[40, 40]} align="stretch">
            <Col xs={24} lg={9} xl={8}>
              <div className={styles.infoCol}>
                <h1 id="contact-heading" className={styles.heading}>
                  {t('contact.title')}
                </h1>
                <p className={styles.intro}>{t('contact.intro')}</p>
                <ul className={styles.detailList}>
                  {CONTACT_DETAILS.map((detail) => {
                    const content = (
                      <>
                        <ContactDetailIcon detailKey={detail.key} />
                        <span className={styles.detailText}>
                          {t(`contact.details.${detail.key}`)}
                        </span>
                      </>
                    );

                    return (
                      <li key={detail.key} className={styles.detailItem}>
                        {detail.href ? (
                          <a href={detail.href} className={styles.detailLink}>
                            {content}
                          </a>
                        ) : (
                          <div className={styles.detailLink}>{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>

            <Col xs={24} lg={8} xl={9}>
              <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onFinish={handleFinish}
                requiredMark={false}
              >
                <Form.Item
                  name="name"
                  label={t('contact.form.name')}
                  rules={[{ required: true, message: t('contact.form.nameRequired') }]}
                >
                  <Input size="large" placeholder={t('contact.form.namePlaceholder')} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={t('contact.form.email')}
                  rules={[
                    { required: true, message: t('contact.form.emailRequired') },
                    { type: 'email', message: t('contact.form.emailInvalid') },
                  ]}
                >
                  <Input size="large" placeholder={t('contact.form.emailPlaceholder')} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={t('contact.form.phone')}
                  rules={[{ required: true, message: t('contact.form.phoneRequired') }]}
                >
                  <Input size="large" placeholder={t('contact.form.phonePlaceholder')} />
                </Form.Item>
                <Form.Item
                  name="message"
                  label={t('contact.form.message')}
                  rules={[{ required: true, message: t('contact.form.messageRequired') }]}
                >
                  <TextArea
                    rows={5}
                    size="large"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={submitting}
                  className={styles.submitBtn}
                >
                  {t('contact.form.submit')}
                </Button>
              </Form>
            </Col>

            <Col xs={0} lg={7} xl={7} className={styles.imageCol}>
              <div className={styles.imageWrap}>
                <img
                  src={CONTACT_DECOR_IMAGE_URL}
                  alt=""
                  className={styles.decorImage}
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </div>
      </PageContainer>
    </section>
  );
};
