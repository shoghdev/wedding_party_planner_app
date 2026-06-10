export const getSafeMediaSrc = (url?: string | null): string | undefined => {
  const trimmed = url?.trim();
  return trimmed ? trimmed : undefined;
};
