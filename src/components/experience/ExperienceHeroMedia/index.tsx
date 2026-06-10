import { useEffect, useRef, useSyncExternalStore } from 'react';
import { getSafeMediaSrc } from '@/utils/safeMediaSrc';
import {
  getHeroMediaKind,
  resolveHeroMediaUrl,
  resolveHeyGenEmbedUrl,
} from '@/utils/heroMedia';
import { styles } from './styles';

const MOBILE_MEDIA_QUERY = '(max-width: 991px)';
const EMBED_DESKTOP_WIDTH = 992;
const EMBED_DESKTOP_HEIGHT = 620;

const subscribeMobile = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
};

const getIsMobileSnapshot = () => window.matchMedia(MOBILE_MEDIA_QUERY).matches;

const getIsMobileServerSnapshot = () => false;

type ExperienceHeroMediaProps = Readonly<{
  heroImageUrl: string;
  heroVideoUrl?: string;
  posterUrl?: string;
  imageAlt: string;
}>;

export const ExperienceHeroMedia = ({
  heroImageUrl,
  heroVideoUrl,
  posterUrl,
  imageAlt,
}: ExperienceHeroMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const embedWrapRef = useRef<HTMLDivElement>(null);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot,
  );

  const mediaUrl = resolveHeroMediaUrl(heroImageUrl, heroVideoUrl);
  const safeMediaUrl = getSafeMediaSrc(mediaUrl);
  const mediaKind = safeMediaUrl ? getHeroMediaKind(safeMediaUrl) : 'image';
  const safePosterUrl = getSafeMediaSrc(posterUrl ?? heroImageUrl);

  useEffect(() => {
    if (!isMobile || mediaKind !== 'heygenEmbed') return;

    const wrap = embedWrapRef.current;
    if (!wrap) return;

    const updateScale = () => {
      const scale = wrap.clientWidth / EMBED_DESKTOP_WIDTH;
      wrap.style.setProperty('--embed-scale', String(scale));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [isMobile, mediaKind]);

  useEffect(() => {
    if (mediaKind !== 'video') return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play().catch(() => undefined);
  }, [mediaKind, safeMediaUrl]);

  if (!safeMediaUrl) {
    return <div className={styles.media} aria-hidden />;
  }

  if (mediaKind === 'heygenEmbed') {
    const embedUrl = resolveHeyGenEmbedUrl(safeMediaUrl);

    return (
      <div className={styles.media}>
        <div
          ref={embedWrapRef}
          className={[styles.embedWrap, isMobile && styles.embedWrapMobile]
            .filter(Boolean)
            .join(' ')}
        >
          {isMobile ? (
            <div className={styles.embedScaler}>
              <iframe
                src={embedUrl}
                title={imageAlt}
                className={styles.embedDesktop}
                width={EMBED_DESKTOP_WIDTH}
                height={EMBED_DESKTOP_HEIGHT}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                loading="eager"
              />
            </div>
          ) : (
            <iframe
              src={embedUrl}
              title={imageAlt}
              className={styles.embed}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              loading="eager"
            />
          )}
        </div>
      </div>
    );
  }

  if (mediaKind === 'video') {
    return (
      <div className={styles.media}>
        <div className={styles.videoShell}>
          <video
            ref={videoRef}
            className={styles.video}
            src={safeMediaUrl}
            {...(safePosterUrl ? { poster: safePosterUrl } : {})}
            autoPlay
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            preload="auto"
            aria-label={imageAlt}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.media}>
      <img
        src={safeMediaUrl}
        alt={imageAlt}
        loading="eager"
        fetchPriority="high"
        className={styles.photo}
      />
    </div>
  );
};
