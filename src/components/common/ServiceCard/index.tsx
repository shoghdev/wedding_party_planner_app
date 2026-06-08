import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ServiceCard as ServiceCardData } from '@/types/home';
import { styles } from './styles';

type ServiceCardProps = Readonly<{
  service: ServiceCardData;
  learnMoreKey?: string;
  learnMoreHref?: string;
  onLearnMore?: () => void;
}>;

export const ServiceCard = ({
  service,
  learnMoreKey = 'home.services.learnMore',
  learnMoreHref = '#services',
  onLearnMore,
}: ServiceCardProps) => {
  const { t } = useTranslation();

  const learnMoreContent = (
    <>
      {t(learnMoreKey)}
      <ArrowRightOutlined aria-hidden />
    </>
  );

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <img src={service.imageUrl} alt={t(service.titleKey)} loading="lazy" />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{t(service.titleKey)}</h3>
        <p className={styles.cardDescription}>{t(service.descriptionKey)}</p>
        {onLearnMore ? (
          <button type="button" className={styles.learnMore} onClick={onLearnMore}>
            {learnMoreContent}
          </button>
        ) : (
          <a href={learnMoreHref} className={styles.learnMore}>
            {learnMoreContent}
          </a>
        )}
      </div>
    </article>
  );
};
