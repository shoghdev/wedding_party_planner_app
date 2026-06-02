import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { styles } from './styles';

type LogoProps = Readonly<{
  tone?: 'default' | 'header';
}>;

export const Logo = ({ tone = 'default' }: LogoProps) => {
  const { t } = useTranslation();
  const logoClass = [styles.logo, tone === 'header' && styles.logoHeader]
    .filter(Boolean)
    .join(' ');

  return (
    <Link to="/" className={logoClass} aria-label={t('header.logo.title')}>
      <span className={styles.title}>
        Dream <em className={styles.ampersand}>&</em> Celebrate
      </span>
      <span className={styles.tagline}>{t('header.logo.tagline')}</span>
    </Link>
  );
};
