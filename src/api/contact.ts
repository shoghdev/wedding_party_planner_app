import emailjs from '@emailjs/browser';
import type { ContactFormValues } from '@/types/contact';
import {
  ensureEmailJsInitialized,
  getEmailJsConfig,
  getEmailJsErrorMessage,
} from '@/api/emailjsClient';

/** Maps form values to common EmailJS template variable names. */
const toTemplateParams = (values: ContactFormValues) => ({
  from_name: values.name,
  from_email: values.email,
  user_name: values.name,
  user_email: values.email,
  name: values.name,
  email: values.email,
  phone: values.phone,
  user_phone: values.phone,
  message: values.message,
  reply_to: values.email,
});

export const sendContactMessage = async (values: ContactFormValues): Promise<void> => {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  ensureEmailJsInitialized(publicKey);

  try {
    const response = await emailjs.send(serviceId, templateId, toTemplateParams(values), {
      publicKey,
    });

    if (response.status !== 200) {
      throw response;
    }
  } catch (error) {
    const message = getEmailJsErrorMessage(error);
    throw new Error(message);
  }
};
