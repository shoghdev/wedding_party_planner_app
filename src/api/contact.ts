import emailjs from '@emailjs/browser';
import type { ContactFormValues } from '@/types/contact';

const getEmailJsConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  if (
    serviceId === 'your_service_id' ||
    templateId === 'your_template_id' ||
    publicKey === 'your_public_key'
  ) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  return { serviceId, templateId, publicKey };
};

export const sendContactMessage = async (values: ContactFormValues): Promise<void> => {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: values.name,
      from_email: values.email,
      phone: values.phone,
      message: values.message,
      reply_to: values.email,
    },
    { publicKey },
  );
};
