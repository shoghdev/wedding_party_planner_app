import { Skeleton } from 'antd';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { SectionLabel } from '@/components/common/SectionLabel';
import { ProcessStepIcon } from '@/components/experience/ProcessStepIcon';
import { useProcessSteps } from '@/hooks/useExperienceContent';
import { styles } from './styles';

export const ProcessTimelineSection = () => {
  const { t } = useTranslation();
  const { data: steps, isLoading } = useProcessSteps();

  return (
    <section className={styles.section}>
      <PageContainer>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <>
            <RevealOnScroll variant="fadeUp">
              <SectionLabel text={t('experience.process.overline')} />
              <h2 className={styles.heading}>{t('experience.process.title')}</h2>
            </RevealOnScroll>

            <RevealOnScroll className={styles.timeline} variant="fade">
              <div className={styles.track} aria-hidden>
                {steps?.map((step) => (
                  <div key={step.id} className={styles.trackNode}>
                    <span className={styles.stepBadge}>{step.stepNumber}</span>
                  </div>
                ))}
              </div>

              <div className={styles.stepsGrid}>
                {steps?.map((step, index) => (
                  <div
                    key={step.id}
                    className={styles.stepCardWrap}
                    style={{ '--step-delay': `${index * 120}ms` } as CSSProperties}
                  >
                    <article className={styles.stepCard}>
                      <div className={styles.stepMarker}>
                        <span className={styles.mobileBadge}>{step.stepNumber}</span>
                      </div>
                      <div className={styles.stepContent}>
                        <ProcessStepIcon iconKey={step.iconKey} />
                        <h3 className={styles.stepTitle}>{t(step.titleKey)}</h3>
                        <p className={styles.stepDescription}>{t(step.descriptionKey)}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </>
        )}
      </PageContainer>
    </section>
  );
};
