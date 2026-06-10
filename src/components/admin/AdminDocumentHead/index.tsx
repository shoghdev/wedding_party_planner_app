import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { resolveAdminPageTitleKey } from '@/utils/adminPageTitle';

const META_DESCRIPTION = 'description';
const META_ROBOTS = 'robots';

const upsertMeta = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

export const AdminDocumentHead = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const isLoginRoute = pathname === '/admin/login';

  useEffect(() => {
    const pageTitle = isLoginRoute
      ? t('admin.login.title')
      : t(resolveAdminPageTitleKey(pathname));
    const description = isLoginRoute
      ? t('admin.login.description')
      : t('admin.seo.defaultDescription');

    document.title = t('admin.seo.pageTitle', {
      page: pageTitle,
      siteName: t('admin.seo.siteName'),
    });
    upsertMeta(META_DESCRIPTION, description);
    upsertMeta(META_ROBOTS, 'noindex, nofollow');

    const language = i18n.language.slice(0, 2);
    if (language) {
      document.documentElement.lang = language;
    }
  }, [i18n.language, isLoginRoute, pathname, t]);

  return null;
};
