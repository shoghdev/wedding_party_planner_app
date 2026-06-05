import { HeartOutlined } from '@ant-design/icons';
import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { ExperienceHeroMedia } from '@/components/experience/ExperienceHeroMedia';
import { useExperienceContent } from '@/hooks/useExperienceContent';
import { styles } from './styles';

export const ExperienceHeroSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useExperienceContent();

  return (
    <section className={styles.section}>
      <PageContainer>
        <Row
          gutter={[
            { xs: 24, sm: 32, lg: 48 },
            { xs: 28, sm: 36, lg: 0 },
          ]}
          align="middle"
          className={styles.heroRow}
        >
          <Col xs={24} lg={10} xl={10}>
            <div className={styles.content}>
              <SectionLabel text={t('experience.hero.overline')} />
              <h1 className={styles.heading}>
                {t('experience.hero.titleBefore')}{' '}
                <em className={styles.scriptAccent}>{t('experience.hero.titleAccent')}</em>
                {t('experience.hero.titleAfter')}
              </h1>
              <p className={styles.description}>{t('experience.hero.description')}</p>
            </div>
          </Col>

          <Col xs={24} lg={14} xl={14} className={styles.visualCol}>
            <div className={styles.mediaStage} aria-hidden={isLoading}>
              {isLoading ? (
                <Skeleton.Image active className={styles.skeleton} />
              ) : (
                <div className={styles.heroVisual}>
                  <ExperienceHeroMedia
                    heroImageUrl={data?.heroImageUrl ?? ''}
                    heroVideoUrl={data?.heroVideoUrl}
                    posterUrl={data?.heroImageUrl}
                    imageAlt={t('experience.hero.imageAlt')}
                  />
                  <div className={styles.badge}>
                    <span className={styles.badgeIcon} aria-hidden>
                      <HeartOutlined />
                    </span>
                    <p className={styles.badgeText}>{t('experience.hero.badge')}</p>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
