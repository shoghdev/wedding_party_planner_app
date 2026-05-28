import { Carousel, Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { AccentHeading } from '@/components/common/AccentHeading';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { ServiceCard } from '@/components/common/ServiceCard';
import { useServices } from '@/hooks/useHomeContent';
import { styles } from './styles';

export const ServicesSection = () => {
  const { t } = useTranslation();
  const { data: services, isLoading } = useServices();

  return (
    <section id="services" className={styles.section}>
      <PageContainer>
        <div className={styles.header}>
          <SectionLabel text={t('home.services.overline')} />
          <AccentHeading
            prefix={t('home.services.titlePrefix')}
            accent={t('home.services.titleAccent')}
          />
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
              <Row gutter={[24, 24]}>
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
