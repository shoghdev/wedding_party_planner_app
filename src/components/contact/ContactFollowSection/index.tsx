import {
  FacebookOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import styles from './index.module.css';

export const ContactFollowSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section} aria-labelledby="contact-follow-heading">
      <PageContainer>
        <h2 id="contact-follow-heading" className={styles.heading}>
          {t('contact.follow.title')}
        </h2>
        <div className={styles.socials}>
          <a
            href="https://instagram.com"
            className={styles.socialLink}
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramOutlined />
          </a>
          <a
            href="https://facebook.com"
            className={styles.socialLink}
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://pinterest.com"
            className={styles.socialLink}
            aria-label="Pinterest"
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.pinterestMark} aria-hidden>
              P
            </span>
          </a>
        </div>
      </PageContainer>
    </section>
  );
};
