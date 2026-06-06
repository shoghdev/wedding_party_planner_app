import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { useExperienceContent } from '@/hooks/useExperienceContent';
import { styles } from './styles';

export const ExperienceCtaSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useExperienceContent();

  return (
    <section className={styles.section}>
      <PageContainer>
        <RevealOnScroll variant="fadeUp">
          <div className={styles.banner}>
            <div className={styles.panel}>
              <div className={styles.panelInner}>
                <div className={styles.copy}>
                  <p className={styles.lineOne}>{t('experience.cta.lineOne')}</p>
                  <p className={styles.lineTwo}>
                    {t('experience.cta.lineTwoBefore')}{' '}
                    <em className={styles.scriptAccent}>{t('experience.cta.lineTwoAccent')}</em>{' '}
                    {t('experience.cta.lineTwoAfter')}
                  </p>
                </div>

                <Button type="default" size="large" className={styles.ctaBtn}>
                  <span className={styles.btnLabel}>{t('experience.cta.button')}</span>
                  <span className={styles.arrowCircle} aria-hidden>
                    <ArrowRightOutlined />
                  </span>
                </Button>
              </div>
            </div>

            <div className={styles.visual} aria-hidden={isLoading}>
              {isLoading ? (
                <Skeleton.Image active className={styles.skeleton} />
              ) : (
                <>
                  <img
                    src={data?.ctaImageUrl}
                    alt=""
                    loading="lazy"
                    className={styles.ctaImage}
                  />
                  <div className={styles.imageBlend} aria-hidden />
                </>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </PageContainer>
    </section>
  );
};
