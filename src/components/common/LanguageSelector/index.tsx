import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '@/types/i18n';
import { LANGUAGE_LABELS, LANGUAGE_OPTIONS } from './consts';
import { styles } from './styles';

type LanguageSelectorProps = Readonly<{
  variant?: 'default' | 'header' | 'admin';
  compact?: boolean;
}>;

export const LanguageSelector = ({ variant = 'default', compact = false }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const current = (i18n.language?.slice(0, 2) ?? 'en') as SupportedLanguage;
  const currentLabel = LANGUAGE_LABELS[current] ?? LANGUAGE_LABELS.en;
  const isCompactAdmin = variant === 'admin' && compact;
  const selectorClass = [
    styles.selector,
    variant === 'header' && styles.selectorHeader,
    variant === 'admin' && styles.selectorAdmin,
    variant === 'admin' && compact && styles.selectorAdminCompact,
  ]
    .filter(Boolean)
    .join(' ');

  const items: MenuProps['items'] = LANGUAGE_OPTIONS.map((lang) => ({
    key: lang,
    label: LANGUAGE_LABELS[lang],
  }));

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    void i18n.changeLanguage(key);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick, selectedKeys: [current] }}
      trigger={['click']}
      placement="bottomRight"
    >
      <button
        type="button"
        className={selectorClass}
        aria-haspopup="listbox"
        aria-label={
          isCompactAdmin ? t('header.languageSelector', { language: currentLabel }) : undefined
        }
      >
        {isCompactAdmin ? (
          <span className={styles.code}>{currentLabel}</span>
        ) : (
          <>
            <span className={styles.code}>{currentLabel}</span>
            <DownOutlined className={styles.chevron} aria-hidden />
          </>
        )}
      </button>
    </Dropdown>
  );
};
