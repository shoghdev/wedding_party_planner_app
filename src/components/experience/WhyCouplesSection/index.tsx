import { HeartOutlined } from '@ant-design/icons';
import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { SectionLabel } from '@/components/common/SectionLabel';
import { WhyCouplesFeatureIcon } from '@/components/experience/WhyCouplesFeatureIcon';
import { useExperienceContent, useWhyCouplesFeatures } from '@/hooks/useExperienceContent';
import { getSafeMediaSrc } from '@/utils/safeMediaSrc';
import { styles } from './styles';

export const WhyCouplesSection = () => {
  const { t } = useTranslation();
  const { data: content, isLoading: contentLoading } = useExperienceContent();
  const { data: features, isLoading: featuresLoading } = useWhyCouplesFeatures();
  const whyCouplesImageUrl = getSafeMediaSrc(content?.whyCouplesImageUrl);

  return (
    <section className={styles.section}>
      <PageContainer>
        <Row
          gutter={[
            { xs: 32, sm: 40, lg: 56 },
            { xs: 40, sm: 48, lg: 0 },
          ]}
          align="middle"
        >
          <Col xs={24} lg={11} xl={10} className={styles.imageCol}>
            <RevealOnScroll className={styles.imageReveal} variant="fadeLeft">
              <div className={styles.imageWrap}>
                {contentLoading ? (
                  <Skeleton.Image active className={styles.skeleton} />
                ) : whyCouplesImageUrl ? (
                  <>
                    <img
                      src={whyCouplesImageUrl}
                      alt={t('experience.whyCouples.imageAlt')}
                      loading="lazy"
                      className={styles.image}
                    />
                    <div className={styles.badge}>
                      <span className={styles.badgeIcon} aria-hidden>
                        <HeartOutlined />
                      </span>
                      <p className={styles.badgeText}>{t('experience.whyCouples.badge')}</p>
                    </div>
                  </>
                ) : null}
              </div>
            </RevealOnScroll>
          </Col>

          <Col xs={24} lg={13} xl={14} className={styles.contentCol}>
            <RevealOnScroll variant="fadeUp">
              <SectionLabel text={t('experience.whyCouples.overline')} />
              <h2 className={styles.title}>
                {t('experience.whyCouples.titleBefore')}{' '}
                <em className={styles.scriptAccent}>{t('experience.whyCouples.titleAccent')}</em>{' '}
                {t('experience.whyCouples.titleAfter')}
              </h2>
            </RevealOnScroll>

            <Row
              gutter={[
                { xs: 24, sm: 28 },
                { xs: 28, sm: 32 },
              ]}
              className={styles.featuresGrid}
            >
              {featuresLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Col key={index} xs={24} sm={12}>
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </Col>
                  ))
                : features?.map((feature, index) => (
                    <Col key={feature.id} xs={24} sm={12}>
                      <RevealOnScroll variant="fadeUp" delay={index * 80}>
                        <article className={styles.featureCard}>
                          <WhyCouplesFeatureIcon iconKey={feature.iconKey} />
                          <div className={styles.featureBody}>
                            <h3 className={styles.featureTitle}>{t(feature.titleKey)}</h3>
                            <p className={styles.featureDescription}>
                              {t(feature.descriptionKey)}
                            </p>
                          </div>
                        </article>
                      </RevealOnScroll>
                    </Col>
                  ))}
            </Row>
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
