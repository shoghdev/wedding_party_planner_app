import { EXPERIENCE_HERO_LOCAL_VIDEO_URL } from '@/consts/experienceHeroMedia';

export type HeroMediaKind = 'image' | 'video' | 'heygenEmbed';

export type ResolvedHeroMedia = Readonly<{
  playbackUrl: string;
  kind: HeroMediaKind;
  heyGenPageUrl?: string;
}>;

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)(\?|$)/i;
const HEYGEN_HOST_PATTERN = /heygen\.com/i;
const HEYGEN_EMBED_PAGE_PATTERN = /app\.heygen\.com\/(videos|share)\//i;
const HEYGEN_VIDEO_AGENT_PATTERN = /app\.heygen\.com\/video-agent\//i;
const HEYGEN_EMBED_PATTERN = /app\.heygen\.com\/embeds\//i;

export const resolveHeroMediaUrl = (
  heroImageUrl: string,
  heroVideoUrl?: string,
): string => heroVideoUrl?.trim() || heroImageUrl.trim();

export const resolveHeroMedia = (
  heroImageUrl: string,
  heroVideoUrl?: string,
): ResolvedHeroMedia => {
  const trimmedVideo = heroVideoUrl?.trim();

  if (!trimmedVideo) {
    return { playbackUrl: heroImageUrl.trim(), kind: 'image' };
  }

  if (
    VIDEO_FILE_PATTERN.test(trimmedVideo) ||
    trimmedVideo.includes('files2.heygen.ai') ||
    trimmedVideo.startsWith('/videos/')
  ) {
    return { playbackUrl: trimmedVideo, kind: 'video' };
  }

  if (HEYGEN_VIDEO_AGENT_PATTERN.test(trimmedVideo)) {
    return {
      playbackUrl: EXPERIENCE_HERO_LOCAL_VIDEO_URL,
      kind: 'video',
      heyGenPageUrl: trimmedVideo,
    };
  }

  if (
    HEYGEN_HOST_PATTERN.test(trimmedVideo) &&
    (HEYGEN_EMBED_PAGE_PATTERN.test(trimmedVideo) || HEYGEN_EMBED_PATTERN.test(trimmedVideo))
  ) {
    return { playbackUrl: trimmedVideo, kind: 'heygenEmbed' };
  }

  return { playbackUrl: heroImageUrl.trim(), kind: 'image' };
};

export const getHeroMediaKind = (url: string): HeroMediaKind =>
  resolveHeroMedia('', url).kind;

export const resolveHeyGenEmbedUrl = (url: string): string => {
  let embedUrl = url;

  if (!HEYGEN_EMBED_PATTERN.test(url)) {
    const videosMatch = url.match(/app\.heygen\.com\/videos\/([^/?#]+)/i);
    if (videosMatch?.[1]) {
      embedUrl = `https://app.heygen.com/embeds/${videosMatch[1]}`;
    } else {
      const shareMatch = url.match(/app\.heygen\.com\/share\/([^/?#]+)/i);
      if (shareMatch?.[1]) {
        embedUrl = `https://app.heygen.com/embeds/${shareMatch[1]}`;
      }
    }
  }

  const parsed = new URL(embedUrl);
  parsed.searchParams.set('autoplay', '1');

  return parsed.toString();
};
