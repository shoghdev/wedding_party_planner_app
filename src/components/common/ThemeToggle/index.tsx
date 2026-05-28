import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ThemeMode } from '@/types/theme';
import { styles } from './styles';

type ThemeToggleProps = Readonly<{
  mode: ThemeMode;
  onToggle: () => void;
}>;

export const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => {
  const { t } = useTranslation();
  const isLight = mode === 'light';

  return (
    <button
      type="button"
      className={styles.toggle}
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
