import type { ReactNode } from 'react';
import styles from './index.module.css';

type FeatureIconProps = Readonly<{
  iconKey: string;
}>;

const ICONS: Record<string, ReactNode> = {
  heart: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 25s-7-4.8-7-10.2c0-2.4 1.8-4.3 4-4.3 1.5 0 2.9.9 3.6 2.2.7-1.3 2.1-2.2 3.6-2.2 2.2 0 4 1.9 4 4.3C23 20.2 16 25 16 25Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M16 6v4M16 22v4M6 16h4M22 16h4M9.5 9.5l2.8 2.8M19.7 19.7l2.8 2.8M22.5 9.5l-2.8 2.8M12.3 19.7l-2.8 2.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 26c-6-8-6-14 0-20 6 6 6 12 0 20Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M16 26V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  ribbon: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M10 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M10 12v10l6-3 6 3V12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export const FeatureIcon = ({ iconKey }: FeatureIconProps) => (
  <span className={styles.iconWrap} aria-hidden>
    {ICONS[iconKey] ?? ICONS.heart}
  </span>
);
