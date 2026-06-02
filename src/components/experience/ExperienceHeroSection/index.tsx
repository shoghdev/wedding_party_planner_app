import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { styles } from './styles';

export const ExperienceHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <PageContainer>
        <div className={styles.heroWrap}>
          <img
            src="/images/about/center-floral-background.webp"
            alt=""
            aria-hidden
            className={styles.floralLeft}
          />
          <img
            src="/images/about/right-floral-background.webp"
            alt=""
            aria-hidden
            className={styles.floralRight}
          />

          <div className={styles.content}>
            <SectionLabel text={t('experience.hero.overline')} />
            <h1 className={styles.heading}>
              {t('experience.hero.titleBefore')}{' '}
              <em className={styles.scriptAccent}>{t('experience.hero.titleAccent')}</em>
              {t('experience.hero.titleAfter')}
            </h1>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
