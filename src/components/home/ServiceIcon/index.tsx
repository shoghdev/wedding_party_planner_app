import type { ReactNode } from 'react';

type ServiceIconProps = Readonly<{
  iconKey: string;
}>;

const ICONS: Record<string, ReactNode> = {
  wedding: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="13" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 7.5c0-1.5 1.2-2.5 2.5-2.5S17 6 17 7.5c0 2-2.5 3.5-5 5.5-2.5-2-5-3.5-5-5.5C7 6 8 5 9.5 5S12 6 12 7.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  parties: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12 13v7M9.5 17.5h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6 8c-1.5 0-2.5 1-2.5 2.2S4.5 12.5 6 12.5M18 8c1.5 0 2.5 1 2.5 2.2S19.5 12.5 18 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  destination: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="3" ry="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 12h15M6.5 8.5h11M6.5 15.5h11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
};

export const ServiceIcon = ({ iconKey }: ServiceIconProps) => (
  <span className="service-icon">{ICONS[iconKey] ?? ICONS.wedding}</span>
);
