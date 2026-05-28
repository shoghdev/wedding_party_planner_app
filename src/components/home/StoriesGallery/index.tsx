import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { StorySlide } from '@/types/home';
import { styles } from './styles';

const SCROLL_STEP = 300;

type StoriesGalleryProps = Readonly<{
  slides: readonly StorySlide[];
}>;

export const StoriesGallery = ({ slides }: StoriesGalleryProps) => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction === 'next' ? SCROLL_STEP : -SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.galleryWrap}>
      <Button
        type="default"
        shape="circle"
        className={`${styles.navBtn} ${styles.navBtnPrev}`}
        icon={<LeftOutlined />}
        aria-label={t('home.stories.prev')}
        onClick={() => scroll('prev')}
      />
      <div ref={trackRef} className={styles.track} role="list">
        {slides.map((slide) => (
          <figure key={slide.id} className={styles.slide} role="listitem">
            <img src={slide.imageUrl} alt={t(slide.altKey)} loading="lazy" />
          </figure>
        ))}
      </div>
      <Button
        type="default"
        shape="circle"
        className={`${styles.navBtn} ${styles.navBtnNext}`}
        icon={<RightOutlined />}
        aria-label={t('home.stories.next')}
        onClick={() => scroll('next')}
      />
    </div>
  );
};
