import { Button, Carousel, Col, Row, Skeleton } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { PORTFOLIO_PAGE_SIZE } from '@/components/portfolio/consts';
import { PortfolioFilterBar } from '@/components/portfolio/PortfolioFilterBar';
import { usePortfolioPage } from '@/hooks/usePortfolioPage';
import type { PortfolioCategory, PortfolioItem } from '@/types/portfolio';
import { styles } from './styles';

const PortfolioGridItem = ({ item }: { item: PortfolioItem }) => {
  const { t } = useTranslation();

  return (
    <figure className={styles.gridItem}>
      <div className={styles.imageWrap}>
        <img src={item.imageUrl} alt={t(item.altKey)} loading="lazy" />
      </div>
    </figure>
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
          <Row gutter={[24, 24]}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} lg={8}>
                <Skeleton.Image active style={{ width: '100%', height: 280 }} />
              </Col>
            ))}
          </Row>
        ) : visibleItems.length === 0 ? (
          <p className={styles.emptyState}>{t('portfolioPage.empty')}</p>
        ) : (
          <>
            <div className={styles.desktopGrid}>
              <Row gutter={[24, 24]}>
                {visibleItems.map((item) => (
                  <Col key={item.id} xs={24} sm={12} lg={8}>
                    <PortfolioGridItem item={item} />
                  </Col>
                ))}
              </Row>
            </div>

            <div className={styles.carouselWrap}>
              <Carousel dots draggable>
                {visibleItems.map((item) => (
                  <div key={item.id}>
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
