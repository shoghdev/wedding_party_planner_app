import { Carousel, Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
<<<<<<< HEAD
import { ServiceCard } from '@/components/common/ServiceCard';
=======
import { ServiceIcon } from '@/components/home/ServiceIcon';
>>>>>>> origin/main
import { useServices } from '@/hooks/useHomeContent';
import { styles } from './styles';

<<<<<<< HEAD
=======
const ServiceCardItem = ({ service }: { service: ServiceCard }) => {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <div className={styles.cardImageWrap}>
        <div className={styles.cardImage}>
          <img src={service.imageUrl} alt={t(service.titleKey)} loading="lazy" />
        </div>
        <div className={styles.iconBadge}>
          <ServiceIcon iconKey={service.iconKey} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{t(service.titleKey)}</h3>
        <p className={styles.cardDescription}>{t(service.descriptionKey)}</p>
        <a href="#services" className={styles.learnMore}>
          {t('home.services.learnMore')}
          <ArrowRightOutlined aria-hidden />
        </a>
      </div>
    </article>
  );
};

>>>>>>> origin/main
export const ServicesSection = () => {
  const { t } = useTranslation();
  const { data: services, isLoading } = useServices();

  return (
    <section id="services" className={styles.section}>
      <PageContainer>
        <div className={styles.header}>
          <SectionLabel text={t('home.services.overline')} />
          <h2 className={styles.heading}>
            <span className={styles.headingLine}>{t('home.services.titleLine1')}</span>
            <span className={styles.headingLine}>
              {t('home.services.titlePrefix')}{' '}
              <em className={styles.headingAccent}>{t('home.services.titleAccent')}</em>
            </span>
          </h2>
        </div>

        {isLoading ? (
          <Row gutter={[24, 24]}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Col key={index} xs={24} md={8}>
                <Skeleton active paragraph={{ rows: 4 }} />
              </Col>
            ))}
          </Row>
        ) : (
          <>
            <div className={styles.desktopGrid}>
              <Row gutter={[28, 28]}>
                {services?.map((service) => (
                  <Col key={service.id} xs={24} md={8}>
                    <ServiceCard service={service} learnMoreHref="/services" />
                  </Col>
                ))}
              </Row>
            </div>

            <div className={styles.carouselWrap}>
              <Carousel dots draggable>
                {services?.map((service) => (
                  <div key={service.id}>
                    <ServiceCard service={service} learnMoreHref="/services" />
                  </div>
                ))}
              </Carousel>
            </div>
          </>
        )}
      </PageContainer>
    </section>
  );
};
