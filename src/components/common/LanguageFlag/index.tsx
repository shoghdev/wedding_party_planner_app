import { useId } from 'react';
import type { SupportedLanguage } from '@/types/i18n';
import { styles } from './styles';

type LanguageFlagProps = Readonly<{
  language: SupportedLanguage;
  className?: string;
  title?: string;
}>;

const FLAG_VIEWBOX = '0 0 60 40';

const FlagEn = ({ clipSuffix }: { clipSuffix: string }) => (
  <svg viewBox={FLAG_VIEWBOX} aria-hidden className={styles.flagSvg}>
    <clipPath id={`gb-s-${clipSuffix}`}>
      <path d="M0,0 v40 h60 v-40 z" />
    </clipPath>
    <clipPath id={`gb-t-${clipSuffix}`}>
      <path d="M30,20 h30 v20 z v20 h-30 z h-30 z v-20 z v-20 h30 z" />
    </clipPath>
    <g clipPath={`url(#gb-s-${clipSuffix})`}>
      <path d="M0,0 v40 h60 v-40 z" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path
        d="M0,0 L60,40 M60,0 L0,40"
        clipPath={`url(#gb-t-${clipSuffix})`}
        stroke="#C8102E"
        strokeWidth="5"
      />
      <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="13" />
      <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="8" />
    </g>
  </svg>
);

const FlagRu = () => (
  <svg viewBox={FLAG_VIEWBOX} aria-hidden className={styles.flagSvg}>
    <rect width="60" height="13.33" fill="#fff" />
    <rect y="13.33" width="60" height="13.33" fill="#0039A6" />
    <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
  </svg>
);

const FlagAm = () => (
  <svg viewBox={FLAG_VIEWBOX} aria-hidden className={styles.flagSvg}>
    <rect width="60" height="13.33" fill="#D90012" />
    <rect y="13.33" width="60" height="13.33" fill="#0033A0" />
    <rect y="26.67" width="60" height="13.33" fill="#F2A800" />
  </svg>
);

const FLAG_COMPONENTS: Record<
  SupportedLanguage,
  (props: { clipSuffix: string }) => React.ReactElement
> = {
  en: FlagEn,
  ru: () => <FlagRu />,
  am: () => <FlagAm />,
};

export const LanguageFlag = ({ language, className, title }: LanguageFlagProps) => {
  const clipSuffix = useId().replace(/:/g, '');
  const Flag = FLAG_COMPONENTS[language] ?? FLAG_COMPONENTS.en;
  const flagClass = [styles.flag, className].filter(Boolean).join(' ');

  return (
    <span className={flagClass} title={title} aria-hidden={title ? undefined : true}>
      <Flag clipSuffix={clipSuffix} />
    </span>
  );
};
