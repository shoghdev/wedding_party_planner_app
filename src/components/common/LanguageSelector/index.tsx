import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '@/types/i18n';
import { LANGUAGE_FLAGS, LANGUAGE_LABELS, LANGUAGE_OPTIONS } from './consts';
import { styles } from './styles';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const current = (i18n.language?.slice(0, 2) ?? 'en') as SupportedLanguage;

  const items: MenuProps['items'] = LANGUAGE_OPTIONS.map((lang) => ({
    key: lang,
    label: (
      <span>
        {LANGUAGE_FLAGS[lang]} {LANGUAGE_LABELS[lang]}
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
      <button type="button" className={styles.selector} aria-haspopup="listbox">
        <span className={styles.flag} aria-hidden>
          {LANGUAGE_FLAGS[current] ?? LANGUAGE_FLAGS.en}
        </span>
        <span>{LANGUAGE_LABELS[current] ?? LANGUAGE_LABELS.en}</span>
        <DownOutlined className={styles.chevron} aria-hidden />
      </button>
    </Dropdown>
  );
};
