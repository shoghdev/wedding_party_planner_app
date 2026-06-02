import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ThemeMode } from '@/types/theme';
import { styles } from './styles';

type ThemeToggleProps = Readonly<{
  mode: ThemeMode;
  onToggle: () => void;
  variant?: 'default' | 'header';
}>;

export const ThemeToggle = ({ mode, onToggle, variant = 'default' }: ThemeToggleProps) => {
  const { t } = useTranslation();
  const isLight = mode === 'light';
  const toggleClass = [styles.toggle, variant === 'header' && styles.toggleHeader]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={toggleClass}
      onClick={onToggle}
      aria-label={t('header.themeToggle')}
      aria-pressed={!isLight}
    >
      <span className={styles.track}>
        <span
          className={[styles.thumb, isLight ? styles.thumbLight : styles.thumbDark]
            .filter(Boolean)
            .join(' ')}
          aria-hidden
        />
        <SunOutlined
          className={[
            styles.icon,
            styles.iconLeft,
            isLight ? styles.iconOnThumb : styles.iconAccent,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden
        />
        <MoonOutlined
          className={[
            styles.icon,
            styles.iconRight,
            isLight ? styles.iconMuted : styles.iconOnThumb,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden
        />
      </span>
    </button>
  );
};
