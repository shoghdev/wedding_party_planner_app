import type { AboutContent } from '@/types/about';
import type { AdminContactContent, AdminState } from '@/types/admin';
import type { ExperienceContent } from '@/types/experience';
import type { HomeContent } from '@/types/home';

export const mergeHomeContent = (
  _fallback: HomeContent,
  adminState: AdminState,
): HomeContent => {
  const { home } = adminState;

  return {
    hero: {
      mainImageUrl: home.heroMainImageUrl,
      polaroidOneUrl: home.heroPolaroidOneUrl,
      polaroidTwoUrl: home.heroPolaroidTwoUrl,
      accentImageUrl: home.heroAccentImageUrl,
    },
    about: {
      imageUrl: home.aboutImageUrl,
    },
  };
};

export const mergeAboutContent = (
  _fallback: AboutContent,
  adminState: AdminState,
): AboutContent => {
  const { about } = adminState;

  return {
    heroImageUrl: about.heroImageUrl,
    storyImageUrl: about.storyImageUrl,
  };
};

export const mergeExperienceContent = (
  _fallback: ExperienceContent,
  adminState: AdminState,
): ExperienceContent => {
  const { experience } = adminState;

  return {
    heroImageUrl: experience.heroImageUrl,
    heroVideoUrl: experience.heroVideoUrl || undefined,
    whyCouplesImageUrl: experience.whyCouplesImageUrl,
    ctaImageUrl: experience.ctaImageUrl,
  };
};

export const getAdminContactContent = (adminState: AdminState): AdminContactContent =>
  adminState.contact;
