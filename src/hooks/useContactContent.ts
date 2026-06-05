import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchAdminState } from '@/api/adminState';
import { QUERY_KEYS } from '@/consts/queryKeys';
import type { ContactDetailKey } from '@/types/contact';
import { getAdminContactContent } from '@/utils/adminContentBridge';

type ContactDetailDisplay = Readonly<{
  key: ContactDetailKey;
  label: string;
  href?: string;
}>;

const CONTACT_KEYS: readonly ContactDetailKey[] = ['phone', 'email', 'address', 'hours'];

export const useContactContent = () => {
  const { t } = useTranslation();
  const { data: adminState } = useQuery({
    queryKey: QUERY_KEYS.admin.state,
    queryFn: fetchAdminState,
  });

  const adminContact = adminState ? getAdminContactContent(adminState) : null;

  const details: readonly ContactDetailDisplay[] = CONTACT_KEYS.map((key) => {
    const adminValue = adminContact?.[key];
    const label = adminValue || t(`contact.details.${key}`);

    if (key === 'phone') {
      return { key, label, href: `tel:${label.replace(/\s/g, '')}` };
    }

    if (key === 'email') {
      return { key, label, href: `mailto:${label}` };
    }

    return { key, label };
  });

  return {
    decorImageUrl: adminContact?.decorImageUrl ?? '',
    details,
  };
};
