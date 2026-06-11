import { Carousel, Col, Row, Skeleton } from 'antd';
import { useState } from 'react';
import { ServiceCard } from '@/components/common/ServiceCard';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { ServiceDetailModal } from '@/components/services/ServiceDetailModal';
import { useServicesPage } from '@/hooks/useServicesPage';
import type { ServiceCard as ServiceCardData } from '@/types/home';
import { styles } from './styles';

export const ServicesGridSection = () => {
  const { data, isLoading } = useServicesPage();
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);

  const handleCloseModal = () => setSelectedService(null);

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
              <Row gutter={[24, 24]} align="stretch">
                {data?.cards.map((service, index) => (
                  <Col key={service.id} xs={24} sm={12} lg={6}>
                    <RevealOnScroll
                      variant="fadeUp"
                      delay={index * 100}
                      className={styles.cardReveal}
                    >
                      <ServiceCard
                        service={service}
                        learnMoreKey="servicesPage.learnMore"
                        onLearnMore={() => setSelectedService(service)}
                      />
                    </RevealOnScroll>
                  </Col>
                ))}
              </Row>
            </div>

            <div className={styles.carouselWrap}>
              <Carousel dots draggable>
                {data?.cards.map((service, index) => (
                  <div key={service.id} className={styles.cardSlot}>
                    <RevealOnScroll
                      variant="fadeUp"
                      delay={index * 100}
                      className={styles.cardReveal}
                    >
                      <ServiceCard
                        service={service}
                        learnMoreKey="servicesPage.learnMore"
                        onLearnMore={() => setSelectedService(service)}
                      />
                    </RevealOnScroll>
                  </div>
                ))}
              </Carousel>
            </div>
          </>
        )}
      </PageContainer>

      <ServiceDetailModal
        service={selectedService}
        open={selectedService !== null}
        onClose={handleCloseModal}
      />
    </section>
  );
};
