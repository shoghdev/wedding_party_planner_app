import type { ContactDetail } from '@/types/contact';

export const CONTACT_DETAILS: readonly ContactDetail[] = [
  { key: 'phone', href: 'tel:+37412345678' },
  { key: 'email', href: 'mailto:info@dreamandcelebrate.am' },
  { key: 'address' },
  { key: 'hours' },
] as const;

export const CONTACT_DECOR_IMAGE_URL = '/images/experience/cta-roses.jpg';
