import {
  AudioMutedOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveHeroMedia, resolveHeyGenEmbedUrl } from '@/utils/heroMedia';
import { styles } from './styles';

type ExperienceHeroMediaProps = Readonly<{
  heroImageUrl: string;
  heroVideoUrl?: string;
  posterUrl?: string;
  imageAlt: string;
}>;

type MinimalVideoControlsProps = Readonly<{
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}>;

const MinimalVideoControls = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}: MinimalVideoControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.controlBtn}
        onClick={onTogglePlay}
        aria-label={isPlaying ? t('experience.hero.pauseVideo') : t('experience.hero.playVideo')}
      >
        {isPlaying ? (
          <PauseCircleOutlined className={styles.controlIcon} aria-hidden />
        ) : (
          <PlayCircleOutlined className={styles.controlIcon} aria-hidden />
        )}
      </button>
      <button
        type="button"
        className={styles.controlBtn}
        onClick={onToggleMute}
        aria-label={isMuted ? t('experience.hero.unmuteVideo') : t('experience.hero.muteVideo')}
      >
        {isMuted ? (
          <AudioMutedOutlined className={styles.controlIcon} aria-hidden />
        ) : (
          <SoundOutlined className={styles.controlIcon} aria-hidden />
        )}
      </button>
    </div>
  );
};

export const ExperienceHeroMedia = ({
  heroImageUrl,
  heroVideoUrl,
  posterUrl,
  imageAlt,
}: ExperienceHeroMediaProps) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const { playbackUrl, kind: mediaKind, heyGenPageUrl } = resolveHeroMedia(
    heroImageUrl,
    heroVideoUrl,
  );
  const fallbackPoster = posterUrl ?? heroImageUrl;

  useEffect(() => {
    setVideoFailed(false);
  }, [playbackUrl, mediaKind]);

  useEffect(() => {
    if (mediaKind !== 'video' || videoFailed) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);

    video.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        video.muted = true;
        setIsMuted(true);

        video.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      });
  }, [mediaKind, playbackUrl, videoFailed]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().then(() => {
        setIsPlaying(true);
      });
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  if (mediaKind === 'heygenEmbed') {
    const embedUrl = resolveHeyGenEmbedUrl(playbackUrl);

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
          <div className={styles.embedControlsMask} aria-hidden />
        </div>
      </div>
    );
  }

  if (mediaKind === 'video' && videoFailed && heyGenPageUrl) {
    return (
      <div className={styles.media}>
        <div className={styles.videoShell}>
          <img src={fallbackPoster} alt={imageAlt} className={styles.photo} />
          <a
            href={heyGenPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heyGenLink}
          >
            <PlayCircleOutlined className={styles.heyGenLinkIcon} aria-hidden />
            {t('experience.hero.openHeyGenVideo')}
          </a>
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
            src={playbackUrl}
            poster={fallbackPoster}
            autoPlay
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            preload="auto"
            aria-label={imageAlt}
            onPlay={() => {
              setIsPlaying(true);
            }}
            onPause={() => {
              setIsPlaying(false);
            }}
            onVolumeChange={() => {
              setIsMuted(videoRef.current?.muted ?? false);
            }}
            onError={() => {
              setVideoFailed(true);
              setIsPlaying(false);
            }}
          />
          <MinimalVideoControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.media}>
      <img
        src={playbackUrl}
        alt={imageAlt}
        loading="eager"
        fetchPriority="high"
        className={styles.photo}
      />
    </div>
  );
};
