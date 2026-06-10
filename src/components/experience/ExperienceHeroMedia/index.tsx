import { useEffect, useRef } from 'react';
import { getSafeMediaSrc } from '@/utils/safeMediaSrc';
import {
  getHeroMediaKind,
  resolveHeroMediaUrl,
  resolveHeyGenEmbedUrl,
} from '@/utils/heroMedia';
import { styles } from './styles';
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

  const mediaUrl = resolveHeroMediaUrl(heroImageUrl, heroVideoUrl);
  const safeMediaUrl = getSafeMediaSrc(mediaUrl);
  const mediaKind = safeMediaUrl ? getHeroMediaKind(safeMediaUrl) : 'image';
  const safePosterUrl = getSafeMediaSrc(posterUrl ?? heroImageUrl);

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
        <div className={styles.embedWrap}>
          <iframe
            src={embedUrl}
            title={imageAlt}
            className={styles.embed}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            loading="eager"
          />
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