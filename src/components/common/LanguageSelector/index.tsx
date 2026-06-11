import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { LanguageFlag } from '@/components/common/LanguageFlag';
import type { SupportedLanguage } from '@/types/i18n';
import { LANGUAGE_NAME_KEYS, LANGUAGE_OPTIONS } from './consts';
import { styles } from './styles';

type LanguageSelectorProps = Readonly<{
  variant?: 'default' | 'header' | 'admin';
  compact?: boolean;
}>;

export const LanguageSelector = ({ variant = 'default', compact = false }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const current = (i18n.language?.slice(0, 2) ?? 'en') as SupportedLanguage;
  const currentName = t(LANGUAGE_NAME_KEYS[current] ?? LANGUAGE_NAME_KEYS.en);
  const isCompactAdmin = variant === 'admin' && compact;
  const showChevron = !isCompactAdmin;
  const selectorClass = [
    styles.selector,
    variant === 'header' && styles.selectorHeader,
    variant === 'admin' && styles.selectorAdmin,
    variant === 'admin' && compact && styles.selectorAdminCompact,
    (variant === 'header' || isCompactAdmin) && styles.selectorFlagOnly,
  ]
    .filter(Boolean)
    .join(' ');

  const items: MenuProps['items'] = LANGUAGE_OPTIONS.map((lang) => ({
    key: lang,
    label: (
      <span className={styles.menuItem}>
        <LanguageFlag language={lang} />
        <span>{t(LANGUAGE_NAME_KEYS[lang])}</span>
      </span>
    ),
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
        aria-label={t('header.languageSelector', { language: currentName })}
      >
        <LanguageFlag language={current} />
        {showChevron ? <DownOutlined className={styles.chevron} aria-hidden /> : null}
      </button>
    </Dropdown>
  );
};
