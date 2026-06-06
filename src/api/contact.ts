import emailjs from '@emailjs/browser';
import {
  ensureEmailJsInitialized,
  getEmailJsConfig,
  getEmailJsErrorMessage,
  sanitizeTemplateParams,
} from '@/api/emailjsClient';
import type { ContactFormValues } from '@/types/contact';

/**
 * Maps form values to EmailJS template variables.
 *
 * Dashboard template Settings tab:
 *   To Email:  {{to_email}}
 *   Reply To:  {{reply_to}}
 */
export const buildContactEmailParams = (
  values: ContactFormValues,
  toEmail: string,
  subject: string,
): Record<string, string> =>
  sanitizeTemplateParams({
    to_email: toEmail,
    name: values.name,
    from_name: values.name,
    email: values.email,
    from_email: values.email,
    phone: values.phone,
    message: values.message,
    subject,
    time: new Date().toLocaleString(),
    reply_to: values.email,
  });

export const sendContactMessage = async (
  values: ContactFormValues,
  subject: string,
): Promise<void> => {
  const { serviceId, templateId, publicKey, toEmail } = getEmailJsConfig();
  const templateParams = buildContactEmailParams(values, toEmail, subject);

  ensureEmailJsInitialized(publicKey);

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey,
    });

    if (response.status !== 200 || response.text !== 'OK') {
      throw response;
    }
  } catch (error) {
    throw new Error(getEmailJsErrorMessage(error));
  }
};
