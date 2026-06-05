import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { FeatureIcon } from '@/components/home/FeatureIcon';
import { useHomeFeatures } from '@/hooks/useHomeContent';
import { styles } from './styles';

export const FeaturesSection = () => {
  const { t } = useTranslation();
  const { data: features, isLoading } = useHomeFeatures();

  return (
    <section className={styles.section} aria-labelledby="features-heading">
      <PageContainer>
        <div className={styles.panel}>
          <h2 id="features-heading" className={styles.srOnly}>
            {t('home.features.heading')}
          </h2>
          <Row gutter={[32, 32]}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Col key={index} xs={24} md={12} lg={6}>
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Col>
                ))
              : features?.map((feature, index) => (
                  <Col key={feature.id} xs={24} md={12} lg={6}>
                    <RevealOnScroll variant="fadeUp" delay={index * 100}>
                      <article className={styles.card}>
                        <FeatureIcon iconKey={feature.iconKey} />
                        <div className={styles.cardBody}>
                          <h3 className={styles.cardTitle}>{t(feature.titleKey)}</h3>
                          <p className={styles.cardDescription}>
                            {t(feature.descriptionKey)}
                          </p>
                        </div>
                      </article>
                    </RevealOnScroll>
                  </Col>
                ))}
          </Row>
        </div>
      </PageContainer>
    </section>
  );
};
