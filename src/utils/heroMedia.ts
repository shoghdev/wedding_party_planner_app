export type HeroMediaKind = 'image' | 'video' | 'heygenEmbed';

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)(\?|$)/i;
const HEYGEN_HOST_PATTERN = /heygen\.com/i;
const HEYGEN_PAGE_PATTERN = /app\.heygen\.com\/(videos|share)\//i;
const HEYGEN_EMBED_PATTERN = /app\.heygen\.com\/embeds\//i;

export const resolveHeroMediaUrl = (
  heroImageUrl: string,
  heroVideoUrl?: string,
): string => heroVideoUrl?.trim() || heroImageUrl.trim();

export const getHeroMediaKind = (url: string): HeroMediaKind => {
  if (VIDEO_FILE_PATTERN.test(url) || url.includes('files2.heygen.ai')) {
    return 'video';
  }

  if (
    HEYGEN_HOST_PATTERN.test(url) &&
    (HEYGEN_PAGE_PATTERN.test(url) || HEYGEN_EMBED_PATTERN.test(url))
  ) {
    return 'heygenEmbed';
  }

  return 'image';
};

export const resolveHeyGenEmbedUrl = (url: string): string => {
  if (HEYGEN_EMBED_PATTERN.test(url)) {
    return url;
  }

  const videosMatch = url.match(/app\.heygen\.com\/videos\/([^/?#]+)/i);
  if (videosMatch?.[1]) {
    return `https://app.heygen.com/embeds/${videosMatch[1]}`;
  }

  const shareMatch = url.match(/app\.heygen\.com\/share\/([^/?#]+)/i);
  if (shareMatch?.[1]) {
    return `https://app.heygen.com/embeds/${shareMatch[1]}`;
  }

  return url;
};
