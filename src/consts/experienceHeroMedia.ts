/** Default HeyGen watch link for the Experience hero video. */
export const EXPERIENCE_HERO_HEYGEN_VIDEO_URL =
  'https://app.heygen.com/video-agent/f95490046d184415bd5d123d1e3df1fa';

/** Optional self-hosted fallback — drop the MP4 from HeyGen into `public/videos/experience-hero.mp4`. */
export const EXPERIENCE_HERO_LOCAL_VIDEO_URL = '/videos/experience-hero.mp4';

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

export const resolveExperienceHeroVideoUrl = (stored?: string): string => {
  const trimmed = stored?.trim();

  if (trimmed && isExperienceHeroVideoUrl(trimmed)) {
    return trimmed;
  }

  return EXPERIENCE_HERO_HEYGEN_VIDEO_URL;
};
