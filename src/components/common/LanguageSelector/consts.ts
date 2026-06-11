import type { SupportedLanguage } from '@/types/i18n';

export const LANGUAGE_OPTIONS: readonly SupportedLanguage[] = ['en', 'ru', 'am'] as const;

export const LANGUAGE_NAME_KEYS: Record<SupportedLanguage, string> = {
  en: 'header.languages.en',
  ru: 'header.languages.ru',
  am: 'header.languages.am',
};
