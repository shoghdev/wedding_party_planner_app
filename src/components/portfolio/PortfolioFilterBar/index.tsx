import { useTranslation } from 'react-i18next';
import { PORTFOLIO_CATEGORIES } from '@/components/portfolio/consts';
import type { PortfolioCategory } from '@/types/portfolio';
import { styles } from './styles';

type PortfolioFilterBarProps = Readonly<{
  activeCategory: PortfolioCategory;
  onCategoryChange: (category: PortfolioCategory) => void;
}>;

export const PortfolioFilterBar = ({
  activeCategory,
  onCategoryChange,
}: PortfolioFilterBarProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.filterBar} role="tablist" aria-label={t('portfolioPage.filters.label')}>
      {PORTFOLIO_CATEGORIES.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[styles.filterBtn, isActive && styles.filterBtnActive]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onCategoryChange(category)}
          >
            {t(`portfolioPage.filters.${category}`)}
          </button>
        );
      })}
    </div>
  );
};
