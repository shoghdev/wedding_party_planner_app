import emailjs from '@emailjs/browser';
import {
  ensureEmailJsInitialized,
  getEmailJsConfig,
  getEmailJsErrorMessage,
} from '@/api/emailjsClient';
import type { ContactFormValues, EmailJsContactParams } from '@/types/contact';

/** Maps form values to EmailJS template variables used in the dashboard template. */
export const buildContactEmailParams = (
  values: ContactFormValues,
  subject: string,
): EmailJsContactParams => ({
  name: values.name,
  from_name: values.name,
  email: values.email,
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
  const { serviceId, templateId, publicKey } = getEmailJsConfig();
  const templateParams = buildContactEmailParams(values, subject);

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
