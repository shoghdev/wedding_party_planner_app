import type { SupportedLanguage } from '@/types/i18n';

export const LANGUAGE_OPTIONS: readonly SupportedLanguage[] = ['en', 'ru', 'am'] as const;

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'EN',
  ru: 'RU',
  am: 'AM',
};

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  am: '🇦🇲',
};
