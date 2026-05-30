import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { PageContainer } from '@/components/common/PageContainer';
import { FOOTER_QUICK_LINKS, FOOTER_SERVICE_LINKS } from './consts';
import { styles } from './styles';

export const AppFooter = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isAboutPage = pathname === '/about';

  return (
    <footer
      id="contact"
      className={[styles.footer, isAboutPage && styles.aboutPageFooter].filter(Boolean).join(' ')}
    >
      <PageContainer>
        <Row gutter={[32, 40]} className={styles.grid}>
          <Col xs={24} sm={12} lg={6}>
            <div className={styles.brandCol}>
              <Logo />
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
                  href="https://pinterest.com"
                  className={styles.socialLink}
                  aria-label="Pinterest"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden style={{ fontWeight: 700, fontSize: 14 }}>P</span>
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
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} lg={6}>
            <h3 className={styles.columnTitle}>{t('footer.quickLinks')}</h3>
            <ul className={styles.linkList}>
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href}>{t(`footer.links.${link.key}`)}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={12} sm={6} lg={6}>
            <h3 className={styles.columnTitle}>{t('footer.services')}</h3>
            <ul className={styles.linkList}>
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href}>{t(`footer.serviceLinks.${link.key}`)}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <h3 className={styles.columnTitle}>{t('footer.contact')}</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <PhoneOutlined className={styles.contactIcon} aria-hidden />
                <span>{t('footer.phone')}</span>
              </li>
              <li className={styles.contactItem}>
                <MailOutlined className={styles.contactIcon} aria-hidden />
                <a href={`mailto:${t('footer.email')}`}>{t('footer.email')}</a>
              </li>
              <li className={styles.contactItem}>
                <EnvironmentOutlined className={styles.contactIcon} aria-hidden />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className={styles.divider} />
        <p className={styles.copyright}>{t('footer.copyright')}</p>
      </PageContainer>
    </footer>
  );
};
