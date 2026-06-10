import { ADMIN_SEED_DATA } from '@/api/mocks/admin';
import { resolveExperienceHeroVideoUrl } from '@/consts/experienceHeroMedia';
import type { AdminState } from '@/types/admin';

export const mergeAdminState = (partial: Partial<AdminState> | null | undefined): AdminState => {
  const source = partial ?? {};

  return {
    ...ADMIN_SEED_DATA,
    ...source,
    home: { ...ADMIN_SEED_DATA.home, ...(source.home ?? {}) },
    about: { ...ADMIN_SEED_DATA.about, ...(source.about ?? {}) },
    experience: {
      ...ADMIN_SEED_DATA.experience,
      ...(source.experience ?? {}),
      heroVideoUrl: resolveExperienceHeroVideoUrl(source.experience?.heroVideoUrl),
    },
    contact: { ...ADMIN_SEED_DATA.contact, ...(source.contact ?? {}) },
    settings: { ...ADMIN_SEED_DATA.settings, ...(source.settings ?? {}) },
    profile: { ...ADMIN_SEED_DATA.profile, ...(source.profile ?? {}) },
    services: source.services ?? ADMIN_SEED_DATA.services,
    gallery: source.gallery ?? ADMIN_SEED_DATA.gallery,
    testimonials: source.testimonials ?? ADMIN_SEED_DATA.testimonials,
    events: source.events ?? ADMIN_SEED_DATA.events,
    bookings: source.bookings ?? ADMIN_SEED_DATA.bookings,
    codeTable: source.codeTable ?? ADMIN_SEED_DATA.codeTable,
  };
};
