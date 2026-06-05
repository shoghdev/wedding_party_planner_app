import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { styles } from './styles';

type AdminBrandLogoProps = Readonly<{
  collapsed?: boolean;
}>;

export const AdminBrandLogo = ({ collapsed = false }: AdminBrandLogoProps) => {
  const { t } = useTranslation();

  return (
    <Link to="/admin" className={styles.brand} aria-label={t('header.logo.title')}>
      <span className={styles.emblem} aria-hidden>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
          <path
            d="M32 52c-6.5-5.5-13-10.5-13-17.5a6.5 6.5 0 0 1 13 0 6.5 6.5 0 0 1 13 0c0 7-6.5 12-13 17.5Z"
            fill="currentColor"
            opacity="0.92"
          />
          <path
            d="M18 24c2-4 6-6 10-4M46 24c-2-4-6-6-10-4M32 12v4M24 18l2 2M40 18l-2 2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M14 34c3 2 6 2 9 0M41 34c3 2 6 2 9 0M20 42c4 2 8 2 12 0M32 42c4 2 8 2 12 0"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </span>

      {!collapsed ? (
        <span className={styles.copy}>
          <span className={styles.title}>
            Dream <em className={styles.amp}>&</em> Celebrate
          </span>
          <span className={styles.subtitle}>{t('admin.brand.subtitle')}</span>
        </span>
      ) : null}
    </Link>
  );
};
