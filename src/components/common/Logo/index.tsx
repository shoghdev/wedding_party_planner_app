import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { styles } from './styles';

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <Link to="/" className={styles.logo} aria-label={t('header.logo.title')}>
      <span className={styles.title}>
        Dream <em className={styles.ampersand}>&</em> Celebrate
      </span>
      <span className={styles.tagline}>{t('header.logo.tagline')}</span>
    </Link>
  );
};
