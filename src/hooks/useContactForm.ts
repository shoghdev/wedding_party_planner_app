import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendContactMessage } from '@/api/contact';
import type { ContactFormValues } from '@/types/contact';

export const useContactForm = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: ContactFormValues) => {
    setSubmitting(true);

    try {
      await sendContactMessage(values);
      message.success(t('contact.form.success'));
      return true;
    } catch (error) {
      const isConfigError =
        error instanceof Error && error.message === 'EMAILJS_NOT_CONFIGURED';

      message.error(
        isConfigError ? t('contact.form.configError') : t('contact.form.error'),
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, onFinish };
};
