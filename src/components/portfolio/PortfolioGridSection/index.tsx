import { Button, Carousel, Skeleton } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { PORTFOLIO_PAGE_SIZE } from '@/components/portfolio/consts';
import { PortfolioFilterBar } from '@/components/portfolio/PortfolioFilterBar';
import { usePortfolioPage } from '@/hooks/usePortfolioPage';
import type { PortfolioCategory, PortfolioItem } from '@/types/portfolio';
import { styles } from './styles';

const PortfolioGridItem = ({ item }: { item: PortfolioItem }) => {
  const { t } = useTranslation();
  const title = t(item.titleKey);

  return (
    <Link to={`/portfolio/${item.id}`} className={styles.gridItemLink}>
      <article className={styles.gridItem}>
        <div className={styles.imageWrap}>
          <img src={item.imageUrl} alt={t(item.altKey)} loading="lazy" />
          <div className={styles.titleOverlay} aria-hidden="true">
            <span className={styles.titleOverlayBackdrop} />
            <span className={styles.titleOverlayText}>{title}</span>
          </div>
        </div>
        <h3 className={styles.titleCaption}>{title}</h3>
      </article>
    </Link>
  );
};

export const PortfolioGridSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = usePortfolioPage();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');
  const [visibleCount, setVisibleCount] = useState(PORTFOLIO_PAGE_SIZE);

  const filteredItems = useMemo(() => {
    if (!data?.items) return [];

    if (activeCategory === 'all') return data.items;

    return data.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, data?.items]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (category: PortfolioCategory) => {
    setActiveCategory(category);
    setVisibleCount(PORTFOLIO_PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((current) => current + PORTFOLIO_PAGE_SIZE);
  };

  return (
    <section id="portfolio" className={styles.section}>
      <PageContainer>
        <PortfolioFilterBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <Skeleton.Image active className={styles.skeletonImage} />
                <Skeleton.Input active size="small" block />
              </div>
            ))}
          </div>
        ) : visibleItems.length === 0 ? (
          <p className={styles.emptyState}>{t('portfolioPage.empty')}</p>
        ) : (
          <>
            <div className={styles.desktopGrid}>
              <div className={styles.grid}>
                {visibleItems.map((item) => (
                  <PortfolioGridItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className={styles.carouselWrap}>
              <Carousel dots draggable>
                {visibleItems.map((item) => (
                  <div key={item.id} className={styles.carouselSlide}>
                    <PortfolioGridItem item={item} />
                  </div>
                ))}
              </Carousel>
            </div>
          </>
        )}

        {!isLoading && hasMore ? (
          <div className={styles.loadMoreWrap}>
            <Button type="primary" size="large" className={styles.loadMoreBtn} onClick={handleLoadMore}>
              {t('portfolioPage.loadMore')}
            </Button>
          </div>
        ) : null}
      </PageContainer>
    </section>
  );
};
