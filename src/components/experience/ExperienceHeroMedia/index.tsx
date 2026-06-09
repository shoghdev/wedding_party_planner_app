import {
  AudioMutedOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

type MinimalVideoControlsProps = Readonly<{
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  showMute?: boolean;
}>;

const MinimalVideoControls = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  showMute = true,
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
      {showMute ? (
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
      ) : null}
    </div>
  );
};

export const ExperienceHeroMedia = ({
  heroImageUrl,
  heroVideoUrl,
  posterUrl,
  imageAlt,
}: ExperienceHeroMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const mediaUrl = resolveHeroMediaUrl(heroImageUrl, heroVideoUrl);
  const mediaKind = getHeroMediaKind(mediaUrl);
  const fallbackPoster = posterUrl ?? heroImageUrl;
  const embedUrl = mediaKind === 'heygenEmbed' ? resolveHeyGenEmbedUrl(mediaUrl) : '';

  useEffect(() => {
    setIsPlaying(false);
    setIsMuted(false);
  }, [mediaUrl, mediaKind]);

  useEffect(() => {
    if (mediaKind !== 'video') return;

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
  }, [mediaKind, mediaUrl]);

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

  const toggleEmbedPlay = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (isPlaying) {
      iframe.src = 'about:blank';
      setIsPlaying(false);
      return;
    }

    iframe.src = embedUrl;
    setIsPlaying(true);
  };

  if (mediaKind === 'heygenEmbed') {
    return (
      <div className={styles.media}>
        <div className={styles.embedWrap}>
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={imageAlt}
            className={styles.embed}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="eager"
            onLoad={() => {
              setIsPlaying(true);
            }}
          />
          <MinimalVideoControls
            isPlaying={isPlaying}
            isMuted={false}
            onTogglePlay={toggleEmbedPlay}
            onToggleMute={() => undefined}
            showMute={false}
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
        src={mediaUrl}
        alt={imageAlt}
        loading="eager"
        fetchPriority="high"
        className={styles.photo}
      />
    </div>
  );
};
