import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendContactMessage } from '@/api/contact';
import type { ContactFormValues } from '@/types/contact';

export const useContactForm = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  const submitForm = async (values: ContactFormValues) => {
    setSubmitting(true);

    const subject = t('contact.form.emailSubject', {
      name: values.name,
      phone: values.phone,
    });

    try {
      await sendContactMessage(values, subject);
      message.success(t('contact.form.success'));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'UNKNOWN';
      const isConfigError = errorMessage === 'EMAILJS_NOT_CONFIGURED';

      if (import.meta.env.DEV) {
        console.error('[Contact form → EmailJS]', error);
      }

      message.error(
        isConfigError
          ? t('contact.form.configError')
          : t('contact.form.errorWithReason', { reason: errorMessage }),
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitForm };
};
