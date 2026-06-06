import { Carousel, Col, Row, Skeleton } from 'antd';
import { ServiceCard } from '@/components/common/ServiceCard';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { useServicesPage } from '@/hooks/useServicesPage';
import { styles } from './styles';

export const ServicesGridSection = () => {
  const { data, isLoading } = useServicesPage();

  return (
    <section id="services" className={styles.section}>
      <PageContainer>
        {isLoading ? (
          <Row gutter={[24, 24]}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} lg={6}>
                <Skeleton active paragraph={{ rows: 4 }} />
              </Col>
            ))}
          </Row>
        ) : (
          <>
            <div className={styles.desktopGrid}>
              <Row gutter={[24, 24]}>
                {data?.cards.map((service, index) => (
                  <Col key={service.id} xs={24} sm={12} lg={6}>
                    <RevealOnScroll variant="fadeUp" delay={index * 100}>
                      <ServiceCard
                        service={service}
                        learnMoreKey="servicesPage.learnMore"
                        learnMoreHref="#contact"
                      />
                    </RevealOnScroll>
                  </Col>
                ))}
              </Row>
            </div>

            <div className={styles.carouselWrap}>
              <Carousel dots draggable>
                {data?.cards.map((service, index) => (
                  <div key={service.id}>
                    <RevealOnScroll variant="fadeUp" delay={index * 100}>
                      <ServiceCard
                        service={service}
                        learnMoreKey="servicesPage.learnMore"
                        learnMoreHref="#contact"
                      />
                    </RevealOnScroll>
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
