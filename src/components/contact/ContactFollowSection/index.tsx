import {
  FacebookOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import styles from './index.module.css';

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', key: 'instagram', icon: <InstagramOutlined /> },
  { href: 'https://facebook.com', key: 'facebook', icon: <FacebookOutlined /> },
  {
    href: 'https://pinterest.com',
    key: 'pinterest',
    icon: (
      <span className={styles.pinterestMark} aria-hidden>
        P
      </span>
    ),
  },
] as const;

export const ContactFollowSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section} aria-labelledby="contact-follow-heading">
      <PageContainer>
        <RevealOnScroll variant="fadeUp">
          <h2 id="contact-follow-heading" className={styles.heading}>
            {t('contact.follow.title')}
          </h2>
        </RevealOnScroll>
        <div className={styles.socials}>
          {SOCIAL_LINKS.map((link, index) => (
            <RevealOnScroll key={link.key} variant="scaleIn" delay={index * 80}>
              <a
                href={link.href}
                className={styles.socialLink}
                aria-label={t(`common.social.${link.key}`)}
                target="_blank"
                rel="noreferrer"
              >
                {link.icon}
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
