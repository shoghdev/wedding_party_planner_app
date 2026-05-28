import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ServiceCard as ServiceCardData } from '@/types/home';
import { styles } from './styles';

type ServiceCardProps = Readonly<{
  service: ServiceCardData;
  learnMoreKey?: string;
  learnMoreHref?: string;
}>;

export const ServiceCard = ({
  service,
  learnMoreKey = 'home.services.learnMore',
  learnMoreHref = '#services',
}: ServiceCardProps) => {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <img src={service.imageUrl} alt={t(service.titleKey)} loading="lazy" />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{t(service.titleKey)}</h3>
        <p className={styles.cardDescription}>{t(service.descriptionKey)}</p>
        <a href={learnMoreHref} className={styles.learnMore}>
          {t(learnMoreKey)}
          <ArrowRightOutlined aria-hidden />
        </a>
      </div>
    </article>
  );
};
