import styles from './index.module.css';

export const HeroFloralArt = () => (
  <svg className={styles.floral} viewBox="0 0 120 120" fill="none" aria-hidden>
    <path
      d="M60 108c0-24-12-44-28-60C22 34 36 18 52 12"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M32 48c-10-4-22 0-28 10M32 48c6-10 18-14 30-10"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M44 72c-10-4-22 0-28 10M44 72c8-10 22-14 34-8"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <ellipse
      cx="22"
      cy="58"
      rx="6"
      ry="10"
      transform="rotate(-28 22 58)"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
    />
    <ellipse
      cx="54"
      cy="34"
      rx="6"
      ry="10"
      transform="rotate(22 54 34)"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
    />
    <ellipse
      cx="18"
      cy="82"
      rx="5"
      ry="9"
      transform="rotate(-18 18 82)"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
    />
  </svg>
);
