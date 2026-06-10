import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { SectionLabel } from '@/components/common/SectionLabel';
import {
  SERVICE_DETAIL_BENEFIT_KEYS,
  SERVICE_DETAIL_INCLUDE_KEYS,
} from '@/components/services/consts';
import type { ServiceCard } from '@/types/home';
import { styles } from './styles';

type ServiceDetailModalProps = Readonly<{
  service: ServiceCard | null;
  open: boolean;
  onClose: () => void;
}>;

export const ServiceDetailModal = ({ service, open, onClose }: ServiceDetailModalProps) => {
  const { t } = useTranslation();

  if (!service) {
    return null;
  }

  const detailBaseKey = `servicesPage.cards.${service.id}.detail`;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      className={styles.modal}
      aria-labelledby="service-detail-title"
    >
      <div className={styles.heroImage}>
        <img src={service.imageUrl} alt={t(service.titleKey)} />
      </div>

      <div className={styles.body}>
        <SectionLabel text={t('servicesPage.modal.overline')} />
        <h2 id="service-detail-title" className={styles.title}>
          {t(service.titleKey)}
        </h2>
        <p className={styles.summary}>{t(service.descriptionKey)}</p>
        <p className={styles.overview}>{t(`${detailBaseKey}.overview`)}</p>

        <section className={styles.section} aria-labelledby="service-benefits-title">
          <h3 id="service-benefits-title" className={styles.sectionTitle}>
            {t('servicesPage.modal.benefitsTitle')}
          </h3>
          <ul className={styles.benefitList}>
            {SERVICE_DETAIL_BENEFIT_KEYS.map((key) => (
              <li key={key} className={styles.benefitItem}>
                <CheckCircleOutlined className={styles.benefitIcon} aria-hidden />
                <span>{t(`${detailBaseKey}.benefits.${key}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="service-includes-title">
          <h3 id="service-includes-title" className={styles.sectionTitle}>
            {t('servicesPage.modal.includesTitle')}
          </h3>
          <ul className={styles.includeList}>
            {SERVICE_DETAIL_INCLUDE_KEYS.map((key) => (
              <li key={key} className={styles.includeItem}>
                <span className={styles.includeBullet} aria-hidden />
                <span>{t(`${detailBaseKey}.includes.${key}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.idealFor}>
          <span className={styles.idealForLabel}>{t('servicesPage.modal.idealForTitle')}</span>
          <p className={styles.idealForText}>{t(`${detailBaseKey}.idealFor`)}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <Button type="primary" className={styles.ctaBtn} href="#contact" onClick={onClose}>
          {t('servicesPage.modal.cta')}
        </Button>
      </div>
    </Modal>
  );
};
