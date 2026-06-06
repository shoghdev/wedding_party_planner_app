import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Col, Collapse, Row } from 'antd';
import type { CollapseProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { PageContainer } from '@/components/common/PageContainer';
import { FOOTER_QUICK_LINKS, FOOTER_SERVICE_LINKS } from './consts';
import { FooterNewsletter } from './FooterNewsletter';
import { styles } from './styles';

const SocialLinks = () => (
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
      <span aria-hidden className={styles.pinterestMark}>
        P
      </span>
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
);

export const AppFooter = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const isCompactFooterPage = pathname === '/about' || pathname === '/experience';

  const accordionItems: CollapseProps['items'] = [
    {
      key: 'quick',
      label: t('footer.quickLinks'),
      children: (
        <ul className={styles.linkList}>
          {FOOTER_QUICK_LINKS.map((link) => (
            <li key={link.key}>
              <a href={link.href}>{t(`footer.links.${link.key}`)}</a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'services',
      label: t('footer.services'),
      children: (
        <ul className={styles.linkList}>
          {FOOTER_SERVICE_LINKS.map((link) => (
            <li key={link.key}>
              <a href={link.href}>{t(`footer.serviceLinks.${link.key}`)}</a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'contact',
      label: t('footer.contact'),
      children: (
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
      ),
    },
    {
      key: 'newsletter',
      label: t('footer.newsletter.title'),
      children: <FooterNewsletter showTitle={false} />,
    },
  ];

  return (
    <footer
      id="contact"
      className={[styles.footer, isCompactFooterPage && styles.aboutPageFooter]
        .filter(Boolean)
        .join(' ')}
    >
      <PageContainer>
        <div className={styles.mobileBrandRow}>
          <div className={styles.brandCol}>
            <Logo />
            <p className={styles.tagline}>{t('footer.tagline')}</p>
          </div>
          <SocialLinks />
        </div>

        <Collapse
          bordered={false}
          expandIconPosition="end"
          className={styles.mobileAccordion}
          items={accordionItems}
        />

        <Row gutter={[32, 40]} className={styles.desktopGrid}>
          <Col xs={24} lg={6}>
            <div className={styles.brandCol}>
              <Logo />
              <p className={styles.tagline}>{t('footer.tagline')}</p>
              <SocialLinks />
            </div>
          </Col>

          <Col xs={12} sm={6} lg={4}>
            <h3 className={styles.columnTitle}>{t('footer.quickLinks')}</h3>
            <ul className={styles.linkList}>
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href}>{t(`footer.links.${link.key}`)}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={12} sm={6} lg={4}>
            <h3 className={styles.columnTitle}>{t('footer.services')}</h3>
            <ul className={styles.linkList}>
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href}>{t(`footer.serviceLinks.${link.key}`)}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={24} sm={12} lg={5}>
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

          <Col xs={24} sm={12} lg={5}>
            <FooterNewsletter />
          </Col>
        </Row>

        <hr className={styles.divider} />
        <p className={styles.copyright}>{t('footer.copyright', { year })}</p>
      </PageContainer>
    </footer>
  );
};
