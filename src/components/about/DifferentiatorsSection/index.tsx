import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { DifferentiatorIcon } from '@/components/about/DifferentiatorIcon';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { useAboutDifferentiators } from '@/hooks/useAboutContent';
import { styles } from './styles';

export const DifferentiatorsSection = () => {
  const { t } = useTranslation();
  const { data: items, isLoading } = useAboutDifferentiators();

  return (
    <section className={styles.section}>
      <PageContainer>
        <RevealOnScroll variant="fadeUp">
          <h2 className={styles.title}>{t('about.different.title')}</h2>
        </RevealOnScroll>

        <Row
          gutter={[
            { xs: 24, sm: 28, lg: 32 },
            { xs: 32, sm: 36, lg: 40 },
          ]}
          className={styles.grid}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Col key={index} xs={24} sm={12} lg={6}>
                  <Skeleton active paragraph={{ rows: 2 }} />
                </Col>
              ))
            : items?.map((item, index) => (
                <Col key={item.id} xs={24} sm={12} lg={6}>
                  <RevealOnScroll variant="scaleIn" delay={index * 100}>
                    <article className={styles.card}>
                      <DifferentiatorIcon iconKey={item.iconKey} />
                      <h3 className={styles.cardTitle}>{t(item.titleKey)}</h3>
                      <p className={styles.cardDescription}>{t(item.descriptionKey)}</p>
                    </article>
                  </RevealOnScroll>
                </Col>
              ))}
        </Row>
      </PageContainer>
    </section>
  );
};
