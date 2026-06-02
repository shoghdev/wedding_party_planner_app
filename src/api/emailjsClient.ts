import emailjs from '@emailjs/browser';
import type { EmailJSResponseStatus } from '@emailjs/browser';

let initialized = false;

export type EmailJsConfig = Readonly<{
  serviceId: string;
  templateId: string;
  publicKey: string;
}>;

export const getEmailJsConfig = (): EmailJsConfig => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  return { serviceId, templateId, publicKey };
};

export const ensureEmailJsInitialized = (publicKey: string): void => {
  if (initialized) {
    return;
  }

  emailjs.init({ publicKey });
  initialized = true;
};

export const getEmailJsErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message === 'EMAILJS_NOT_CONFIGURED') {
    return 'EMAILJS_NOT_CONFIGURED';
  }

  if (typeof error === 'object' && error !== null && 'text' in error) {
    return String((error as EmailJSResponseStatus).text);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'UNKNOWN';
};
