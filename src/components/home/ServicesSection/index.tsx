import { Carousel, Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { ServiceCard } from '@/components/common/ServiceCard';
import { useServices } from '@/hooks/useHomeContent';
import { styles } from './styles';

export const ServicesSection = () => {
  const { t } = useTranslation();
  const { data: services, isLoading } = useServices();

  const items = services ?? [];

  return (
    <section id="services" className={styles.section}>
      <PageContainer>
        {/* HEADER */}
        <div className={styles.header}>
          <SectionLabel text={t('home.services.overline')} />

          <h2 className={styles.heading}>
            <span className={styles.headingLine}>
              {t('home.services.titleLine1')}
            </span>
            <span className={styles.headingLine}>
              {t('home.services.titlePrefix')}{' '}
              <em className={styles.headingAccent}>
                {t('home.services.titleAccent')}
              </em>
            </span>
          </h2>
        </div>

        {/* LOADING */}
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
            {/* DESKTOP GRID */}
            <div className={styles.desktopGrid}>
              <Row gutter={[28, 28]}>
                {items.map((service) => (
                  <Col key={service.id} xs={24} md={8}>
                    <ServiceCard
                      service={service}
                      learnMoreHref="/services"
                    />
                  </Col>
                ))}
              </Row>
            </div>

            {/* MOBILE CAROUSEL */}
            <div className={styles.carouselWrap}>
              <Carousel dots draggable swipeToSlide>
                {items.map((service) => (
                  <div key={service.id}>
                    <ServiceCard
                      service={service}
                      learnMoreHref="/services"
                    />
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