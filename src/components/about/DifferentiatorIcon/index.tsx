import { styles } from './styles';

type DifferentiatorIconProps = Readonly<{
  iconKey: string;
}>;

export const DifferentiatorIcon = ({ iconKey }: DifferentiatorIconProps) => (
  <span className={`${styles.circle} about-diff-icon`} aria-hidden>
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
      {iconKey === 'personalized' && (
        <>
          <path
            d="M12 3c-2 4-6 6-8 10 4-1 8 0 11 2-1-6-3-11-7-14 3 3 5 7 6 11 4-2 7-1 9 3-3-5-8-8-15-10z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17" cy="7" r="1.2" fill="currentColor" />
        </>
      )}
      {iconKey === 'creative' && (
        <path
          d="M6 18c4-8 8-12 14-14-2 6-2 12 2 18-4-1-8 0-12 2-2-4-2-8 0-12z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      {iconKey === 'stressFree' && (
        <path
          d="M12 4l2.2 6.8H21l-5.6 4.1 2.2 6.8L12 17.6 6.4 21.7l2.2-6.8L3 10.8h6.8L12 4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
      {iconKey === 'trusted' && (
        <>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 8.5c-2 0-3.5 1.2-3.5 3 0 2.2 3.5 4.5 3.5 4.5s3.5-2.3 3.5-4.5c0-1.8-1.5-3-3.5-3z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  </span>
);
