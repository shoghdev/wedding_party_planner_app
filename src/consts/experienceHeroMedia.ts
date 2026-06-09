/** Default HeyGen link for the Experience hero video — used as provided by HeyGen. */
export const EXPERIENCE_HERO_HEYGEN_VIDEO_URL =
  'https://app.heygen.com/video-agent/f95490046d184415bd5d123d1e3df1fa';

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
