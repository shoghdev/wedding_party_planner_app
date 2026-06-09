/**
 * HeyGen page link (video-agent). Cannot be embedded on third-party sites.
 * Kept for admin reference — playback uses {@link EXPERIENCE_HERO_HEYGEN_VIDEO_URL}.
 */
export const EXPERIENCE_HERO_HEYGEN_PAGE_URL =
  'https://app.heygen.com/video-agent/f95490046d184415bd5d123d1e3df1fa';

/** HeyGen share URL that plays inline via /embeds/ iframe on the Experience hero. */
export const EXPERIENCE_HERO_HEYGEN_VIDEO_URL =
  'https://app.heygen.com/videos/a-beautiful-moment-fb54d0dd4b9647b78c9cecc7d0e23cae';

export const isExperienceHeroVideoUrl = (url?: string): boolean => {
  const trimmed = url?.trim();
  if (!trimmed) {
    return false;
  }

  return (
    /heygen\.com/i.test(trimmed) ||
    trimmed.includes('files2.heygen.ai') ||
    /\.(mp4|webm|ogg)(\?|$)/i.test(trimmed) ||
    trimmed.startsWith('/videos/')
  );
};

const isHeyGenVideoAgentUrl = (url: string): boolean =>
  /app\.heygen\.com\/video-agent\//i.test(url);

/** Returns a URL that can actually play inline on the site (iframe or MP4). */
export const resolveExperienceHeroVideoUrl = (stored?: string): string => {
  const trimmed = stored?.trim();

  if (trimmed && isExperienceHeroVideoUrl(trimmed) && !isHeyGenVideoAgentUrl(trimmed)) {
    return trimmed;
  }

  return EXPERIENCE_HERO_HEYGEN_VIDEO_URL;
};
