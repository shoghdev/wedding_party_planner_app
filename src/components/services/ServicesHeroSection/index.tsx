import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { useServicesPage } from '@/hooks/useServicesPage';
import { styles } from './styles';

export const ServicesHeroSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useServicesPage();

  return (
    <section className={styles.section}>
      <PageContainer>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={11} xl={10}>
            <div className={styles.content}>
              <SectionLabel text={t('servicesPage.hero.overline')} />
              <h1 className={styles.pageHeading}>{t('servicesPage.hero.title')}</h1>
              <p className={styles.subheading}>{t('servicesPage.hero.subtitle')}</p>
            </div>
          </Col>

          <Col xs={24} lg={13} xl={14} className={styles.visualCol}>
            <div className={styles.visual} aria-hidden={isLoading}>
              {isLoading ? (
                <Skeleton.Image active className={styles.skeletonVisual} />
              ) : (
                <>
                  <div className={styles.pinkOrb} />
                  <div className={styles.imagePrimary}>
                    <img
                      src={data?.content.hero.primaryImageUrl}
                      alt=""
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                  <div className={styles.imageSecondary}>
                    <img
                      src={data?.content.hero.secondaryImageUrl}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.badge}>
                    <span className={styles.badgeText}>{t('servicesPage.hero.badge')}</span>
                    <span className={styles.diamond} aria-hidden />
                  </div>
                  <span className={`${styles.sparkle} ${styles.sparkleOne}`} />
                  <span className={`${styles.sparkle} ${styles.sparkleTwo}`} />
                  <span className={`${styles.sparkle} ${styles.sparkleThree}`} />
                </>
              )}
            </div>
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
