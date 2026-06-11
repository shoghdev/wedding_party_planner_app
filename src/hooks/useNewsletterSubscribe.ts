import { App } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { subscribeToNewsletter } from '@/api/newsletter';
import {
  NewsletterAlreadySubscribedError,
  type NewsletterSubscribeValues,
} from '@/types/newsletter';

export const useNewsletterSubscribe = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);

  const subscribe = async (values: NewsletterSubscribeValues) => {
    setSubmitting(true);

    try {
      await subscribeToNewsletter(values.email);
      message.success(t('footer.newsletter.success'));
      return true;
    } catch (error) {
      if (error instanceof NewsletterAlreadySubscribedError) {
        message.info(t('footer.newsletter.alreadySubscribed'));
        return true;
      }

      if (import.meta.env.DEV) {
        console.error('[Newsletter subscribe]', error);
      }

      message.error(t('footer.newsletter.error'));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, subscribe };
};
