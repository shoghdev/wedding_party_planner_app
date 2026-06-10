export type HeroMediaKind = 'image' | 'video' | 'heygenEmbed';

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)(\?|$)/i;
const HEYGEN_HOST_PATTERN = /heygen\.com/i;
const HEYGEN_EMBED_PAGE_PATTERN = /app\.heygen\.com\/(videos|share)\//i;
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
    (HEYGEN_EMBED_PAGE_PATTERN.test(url) || HEYGEN_EMBED_PATTERN.test(url))
  ) {
    return 'heygenEmbed';
  }

  return 'image';
};

const withHeyGenAutoplay = (url: string): string => {
  const parsed = new URL(url);
  parsed.searchParams.set('autoplay', '0');
  parsed.searchParams.delete('muted');
  parsed.searchParams.delete('mute');

  return parsed.toString();
};

/** Map HeyGen page links to the /embeds/ player URL (autoplay with sound on load). */
export const resolveHeyGenEmbedUrl = (url: string): string => {
  if (HEYGEN_EMBED_PATTERN.test(url)) {
    return withHeyGenAutoplay(url);
  }

  const videosMatch = url.match(/app\.heygen\.com\/videos\/([^/?#]+)/i);
  if (videosMatch?.[1]) {
    return withHeyGenAutoplay(`https://app.heygen.com/embeds/${videosMatch[1]}`);
  }

  const shareMatch = url.match(/app\.heygen\.com\/share\/([^/?#]+)/i);
  if (shareMatch?.[1]) {
    return withHeyGenAutoplay(`https://app.heygen.com/embeds/${shareMatch[1]}`);
  }

  return withHeyGenAutoplay(url);
};
