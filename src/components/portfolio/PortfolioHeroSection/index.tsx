import { useTranslation } from 'react-i18next';
import { PageIntroSection } from '@/components/common/PageIntroSection';

export const PortfolioHeroSection = () => {
  const { t } = useTranslation();

  return (
    <PageIntroSection
      overline={t('portfolioPage.hero.overline')}
      title={t('portfolioPage.hero.title')}
    />
  );
};
