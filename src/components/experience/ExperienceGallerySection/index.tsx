import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { useExperienceGallery } from '@/hooks/useExperienceContent';
import { styles } from './styles';

export const ExperienceGallerySection = () => {
  const { t } = useTranslation();
  const { data: images, isLoading } = useExperienceGallery();

  if (isLoading) {
    return (
      <section className={styles.section}>
        <Skeleton.Image active className={styles.skeleton} />
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label={t('experience.gallery.ariaLabel')}>
      <div className={styles.strip}>
        {images?.map((image, index) => (
          <RevealOnScroll
            key={image.id}
            className={styles.frameReveal}
            variant="scaleIn"
            delay={index * 90}
          >
            <figure className={styles.frame}>
              <img src={image.imageUrl} alt={t(image.altKey)} loading="lazy" />
            </figure>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};
