import { useEffect, useRef } from 'react';
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
  const mediaKind = getHeroMediaKind(mediaUrl);
  const fallbackPoster = posterUrl ?? heroImageUrl;

  useEffect(() => {
    if (mediaKind !== 'video') return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch(() => undefined);
  }, [mediaKind, mediaUrl]);

  if (mediaKind === 'heygenEmbed') {
    const embedUrl = resolveHeyGenEmbedUrl(mediaUrl);

    return (
      <div className={styles.media}>
        <div className={styles.embedWrap}>
          <iframe
            src={embedUrl}
            title={imageAlt}
            className={styles.embed}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
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
            src={mediaUrl}
            poster={fallbackPoster}
            autoPlay
            muted
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
        src={mediaUrl}
        alt={imageAlt}
        loading="eager"
        fetchPriority="high"
        className={styles.photo}
      />
    </div>
  );
};
