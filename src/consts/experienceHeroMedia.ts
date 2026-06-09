/**
 * HeyGen watch link for the Experience hero video.
 * Use a `videos/` or `share/` URL from HeyGen Share — those embed inline on the site.
 * `video-agent/` links cannot iframe; use Share → copy link, or paste a direct `.mp4` URL.
 */
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

export const resolveExperienceHeroVideoUrl = (stored?: string): string => {
  const trimmed = stored?.trim();

  if (trimmed && isExperienceHeroVideoUrl(trimmed)) {
    if (isHeyGenVideoAgentUrl(trimmed)) {
      return EXPERIENCE_HERO_HEYGEN_VIDEO_URL;
    }

    return trimmed;
  }

  return EXPERIENCE_HERO_HEYGEN_VIDEO_URL;
};
