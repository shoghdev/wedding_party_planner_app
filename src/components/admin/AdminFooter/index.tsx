import { HeartFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

export const AdminFooter = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>{t('admin.footer.copyright', { year })}</p>
      <HeartFilled className={styles.heart} aria-hidden />
    </footer>
  );
};
