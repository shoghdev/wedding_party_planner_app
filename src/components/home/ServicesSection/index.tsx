import { ArrowRightOutlined } from '@ant-design/icons';
import { Carousel, Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { AccentHeading } from '@/components/common/AccentHeading';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { useServices } from '@/hooks/useHomeContent';
import type { ServiceCard } from '@/types/home';
import { styles } from './styles';

const ServiceCardItem = ({ service }: { service: ServiceCard }) => {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <img src={service.imageUrl} alt={t(service.titleKey)} loading="lazy" />
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
                    <ServiceCardItem service={service} />
                  </Col>
                ))}
              </Row>
            </div>

            <div className={styles.carouselWrap}>
              <Carousel dots draggable>
                {services?.map((service) => (
                  <div key={service.id}>
                    <ServiceCardItem service={service} />
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
