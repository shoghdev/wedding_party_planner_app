import type { AdminFieldConfig } from '@/consts/adminSections';

export const ADMIN_HOME_FIELDS: readonly AdminFieldConfig[] = [
  { name: 'heroMainImageUrl', labelKey: 'admin.fields.heroMainImageUrl', type: 'url', required: true },
  { name: 'heroPolaroidOneUrl', labelKey: 'admin.fields.heroPolaroidOneUrl', type: 'url', required: true },
  { name: 'heroPolaroidTwoUrl', labelKey: 'admin.fields.heroPolaroidTwoUrl', type: 'url', required: true },
  { name: 'heroAccentImageUrl', labelKey: 'admin.fields.heroAccentImageUrl', type: 'url', required: true },
  { name: 'aboutImageUrl', labelKey: 'admin.fields.aboutImageUrl', type: 'url', required: true },
];

export const ADMIN_ABOUT_FIELDS: readonly AdminFieldConfig[] = [
  { name: 'heroImageUrl', labelKey: 'admin.fields.heroImageUrl', type: 'url', required: true },
  { name: 'storyImageUrl', labelKey: 'admin.fields.storyImageUrl', type: 'url', required: true },
];

export const ADMIN_EXPERIENCE_FIELDS: readonly AdminFieldConfig[] = [
  { name: 'heroImageUrl', labelKey: 'admin.fields.heroImageUrl', type: 'url', required: true },
  { name: 'heroVideoUrl', labelKey: 'admin.fields.heroVideoUrl', type: 'url' },
  { name: 'whyCouplesImageUrl', labelKey: 'admin.fields.whyCouplesImageUrl', type: 'url', required: true },
  { name: 'ctaImageUrl', labelKey: 'admin.fields.ctaImageUrl', type: 'url', required: true },
];

export const ADMIN_CONTACT_FIELDS: readonly AdminFieldConfig[] = [
  { name: 'phone', labelKey: 'admin.fields.phone', type: 'text', required: true },
  { name: 'email', labelKey: 'admin.fields.email', type: 'text', required: true },
  { name: 'address', labelKey: 'admin.fields.address', type: 'text', required: true },
  { name: 'hours', labelKey: 'admin.fields.hours', type: 'text', required: true },
  { name: 'decorImageUrl', labelKey: 'admin.fields.decorImageUrl', type: 'url', required: true },
];

export const ADMIN_PROFILE_FIELDS: readonly AdminFieldConfig[] = [
  { name: 'displayName', labelKey: 'admin.fields.displayName', type: 'text', required: true },
  { name: 'jobTitle', labelKey: 'admin.fields.jobTitle', type: 'text', required: true },
  { name: 'avatarUrl', labelKey: 'admin.fields.avatarUrl', type: 'url', required: true },
  { name: 'bio', labelKey: 'admin.fields.bio', type: 'textarea' },
];

export const ADMIN_SETTINGS_FIELDS: readonly AdminFieldConfig[] = [
  { name: 'siteName', labelKey: 'admin.fields.siteName', type: 'text', required: true },
  { name: 'supportEmail', labelKey: 'admin.fields.supportEmail', type: 'text', required: true },
  {
    name: 'defaultLocale',
    labelKey: 'admin.fields.defaultLocale',
    type: 'select',
    required: true,
    options: [
      { value: 'en', labelKey: 'admin.locales.en' },
      { value: 'ru', labelKey: 'admin.locales.ru' },
      { value: 'am', labelKey: 'admin.locales.am' },
    ],
  },
  { name: 'maintenanceMode', labelKey: 'admin.fields.maintenanceMode', type: 'boolean' },
];
