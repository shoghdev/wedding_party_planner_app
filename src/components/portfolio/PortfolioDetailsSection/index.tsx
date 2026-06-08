import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { usePortfolioDetails } from '@/hooks/usePortfolioDetails';
import { styles } from './styles';

type PortfolioDetailsSectionProps = Readonly<{
  portfolioId: string;
}>;

const INFO_FIELDS = [
  { key: 'location', labelKey: 'portfolioDetails.meta.location', hasIcon: true },
  { key: 'guests', labelKey: 'portfolioDetails.meta.guests', hasIcon: false },
  { key: 'planning', labelKey: 'portfolioDetails.meta.planning', hasIcon: false },
  { key: 'style', labelKey: 'portfolioDetails.meta.style', hasIcon: false },
] as const;

export const PortfolioDetailsSection = ({ portfolioId }: PortfolioDetailsSectionProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = usePortfolioDetails(portfolioId);

  if (isLoading) {
    return (
      <section className={styles.section} data-page="portfolio-details">
        <PageContainer>
          <div className={styles.layout}>
            <div className={styles.heroImage}>
              <Skeleton.Image active className={styles.skeletonHero} />
            </div>
          </div>
        </PageContainer>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={styles.section} data-page="portfolio-details">
        <PageContainer>
          <RevealOnScroll variant="fadeUp">
            <p className={styles.notFound}>{t('portfolioDetails.notFound')}</p>
            <Link to="/portfolio">
              <Button type="primary" className={styles.ctaBtn}>
                {t('portfolioDetails.viewMoreProjects')}
              </Button>
            </Link>
          </RevealOnScroll>
        </PageContainer>
      </section>
    );
  }

  const infoValues = {
    location: t(data.locationKey),
    guests: data.guests,
    planning: t(data.planningKey),
    style: t(data.styleKey),
  };

  return (
    <section className={styles.section} data-page="portfolio-details">
      <PageContainer>
        <div className={styles.layout}>
          <RevealOnScroll className={styles.heroReveal} variant="fadeUp">
            <div className={styles.heroImage}>
              <img src={data.heroImageUrl} alt={t(data.titleKey)} />
            </div>
          </RevealOnScroll>

          <div className={styles.mainContent}>
            <RevealOnScroll variant="fadeUp" delay={80}>
              <h1 className={styles.title}>{t(data.titleKey)}</h1>
            </RevealOnScroll>
            <RevealOnScroll variant="fadeUp" delay={140}>
              <p className={styles.description}>{t(data.descriptionKey)}</p>
            </RevealOnScroll>

            <div className={styles.infoGrid}>
              {INFO_FIELDS.map((field, index) => (
                <RevealOnScroll key={field.key} variant="fadeUp" delay={200 + index * 70}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      {field.hasIcon ? <EnvironmentOutlined className={styles.infoLabelIcon} /> : null}
                      {t(field.labelKey)}
                    </span>
                    <span className={styles.infoValue}>{infoValues[field.key]}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="fadeUp" delay={480}>
              <Link to="/portfolio">
                <Button type="primary" className={styles.ctaBtn}>
                  {t('portfolioDetails.viewMoreProjects')}
                </Button>
              </Link>
            </RevealOnScroll>
          </div>

          <div className={styles.gallery} aria-label={t('portfolioDetails.galleryLabel')}>
            {data.galleryImageUrls.map((url, index) => (
              <RevealOnScroll
                key={url}
                className={styles.galleryReveal}
                variant="scaleIn"
                delay={index * 90}
              >
                <figure className={styles.galleryItem}>
                  <img
                    src={url}
                    alt={t('portfolioDetails.galleryImageAlt', { index: index + 1 })}
                    loading="lazy"
                  />
                </figure>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className={styles.sidebarReveal} variant="fadeLeft" delay={160}>
            <aside className={styles.sidebar}>
              <h2 className={styles.sidebarTitle}>{t('portfolioDetails.detailsTitle')}</h2>
              <ul className={styles.vendorList}>
                {data.vendors.map((vendor) => (
                  <li key={vendor.categoryKey} className={styles.vendorItem}>
                    <span className={styles.vendorCategory}>{t(vendor.categoryKey)}</span>
                    <span className={styles.vendorName}>{t(vendor.nameKey)}</span>
                  </li>
                ))}
              </ul>
              <img
                src="/images/about/right-floral-background.webp"
                alt=""
                aria-hidden
                className={styles.floralDecor}
              />
            </aside>
          </RevealOnScroll>
        </div>
      </PageContainer>
    </section>
  );
};
