import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
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
          <div className={styles.timeline}>
            <div className={styles.track} aria-hidden>
              {steps?.map((step) => (
                <div key={step.id} className={styles.trackNode}>
                  <span className={styles.stepBadge}>{step.stepNumber}</span>
                </div>
              ))}
            </div>

            <div className={styles.stepsGrid}>
              {steps?.map((step) => (
                <article key={step.id} className={styles.stepCard}>
                  <span className={styles.mobileBadge}>{step.stepNumber}</span>
                  <ProcessStepIcon iconKey={step.iconKey} />
                  <h3 className={styles.stepTitle}>{t(step.titleKey)}</h3>
                  <p className={styles.stepDescription}>{t(step.descriptionKey)}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </PageContainer>
    </section>
  );
};
