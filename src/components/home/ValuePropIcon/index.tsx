import type { ReactNode } from 'react';

type ValuePropIconProps = Readonly<{
  iconKey: string;
}>;

const ICONS: Record<string, ReactNode> = {
  expertise: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 24.5s-6.5-4.4-6.5-9.5c0-2.2 1.6-4 3.6-4 1.4 0 2.7.8 3.4 2 .7-1.2 2-2 3.4-2 2 0 3.6 1.8 3.6 4 0 5.1-6.5 9.5-6.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.5c-1.8-.8-3.6-.4-5 1M22.5 12.5c1.8-.8 3.6-.4 5 1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  decorations: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 7l6 9-6 9-6-9 6-9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M10 16h12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  personalized: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 26V14M16 14c-2.5 0-4.5-2-4.5-4.5S13.5 5 16 5s4.5 2 4.5 4.5S18.5 14 16 14Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10 20c-2 1.5-3.5 3.5-4 6M22 20c2 1.5 3.5 3.5 4 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  stressFree: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M16 10v6l4 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 24c1.5-2 4.5-2 6 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export const ValuePropIcon = ({ iconKey }: ValuePropIconProps) => (
  <span className="value-prop-icon">{ICONS[iconKey] ?? ICONS.expertise}</span>
);
