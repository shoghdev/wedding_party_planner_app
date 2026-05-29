import { Button, Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { useAboutContent } from '@/hooks/useAboutContent';
import { styles } from './styles';

export const AboutHeroSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useAboutContent();

  return (
    <section className={styles.section}>
      <PageContainer>
        <Row
          gutter={[
            { xs: 24, sm: 32, lg: 48 },
            { xs: 32, sm: 40, lg: 48 },
          ]}
          align="middle"
          className={styles.heroRow}
        >
          <Col xs={24} lg={10} xl={10}>
            <div className={styles.content}>
              <SectionLabel text={t('about.hero.overline')} />
              <h1 className={styles.heading}>
                {t('about.hero.titleBefore')}{' '}
                <em className={styles.scriptAccent}>{t('about.hero.titleAccent')}</em>{' '}
                {t('about.hero.titleAfter')}
              </h1>
              <p className={styles.description}>{t('about.hero.description')}</p>
              <Button type="primary" size="large" className={styles.cta} href="#our-story">
                {t('about.hero.cta')}
              </Button>
            </div>
          </Col>

          <Col xs={24} lg={14} xl={14} className={styles.visualCol}>
            <div className={styles.mediaStage} aria-hidden={isLoading}>
              <img
                src="/images/about/center-floral-background.png"
                alt=""
                aria-hidden
                className={styles.floralLeft}
              />
              <img
                src="/images/about/right-floral-background.png"
                alt=""
                aria-hidden
                className={styles.floralRight}
              />
              <div className={styles.heroImage}>
                {isLoading ? (
                  <Skeleton.Image active className={styles.skeleton} />
                ) : (
                  <img
                    src={data?.heroImageUrl}
                    alt={t('about.hero.imageAlt')}
                    loading="eager"
                    fetchPriority="high"
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
