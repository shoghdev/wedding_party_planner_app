import emailjs from '@emailjs/browser';
import type { EmailJSResponseStatus } from '@emailjs/browser';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailJsConfig = Readonly<{
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
}>;

export const sanitizeEmailParam = (value: string): string =>
  value.trim().replace(/[\r\n\t]/g, ' ');

export const isValidEmail = (value: string): boolean =>
  EMAIL_PATTERN.test(sanitizeEmailParam(value));

export const sanitizeTemplateParams = (
  params: Record<string, string>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, sanitizeEmailParam(value)]),
  );

export const getEmailJsConfig = (): EmailJsConfig => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL?.trim();

  if (!serviceId || !templateId || !publicKey || !toEmail) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  if (
    serviceId === 'your_service_id' ||
    templateId === 'your_template_id' ||
    publicKey === 'your_public_key' ||
    toEmail === 'your_inbox@example.com'
  ) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  if (!isValidEmail(toEmail)) {
    throw new Error('EMAILJS_INVALID_TO_EMAIL');
  }

  return { serviceId, templateId, publicKey, toEmail };
};

export const ensureEmailJsInitialized = (publicKey: string): void => {
  emailjs.init({ publicKey });
};

export const getEmailJsErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (
      error.message === 'EMAILJS_NOT_CONFIGURED' ||
      error.message === 'EMAILJS_INVALID_TO_EMAIL'
    ) {
      return error.message;
    }
  }

  if (typeof error === 'object' && error !== null && 'text' in error) {
    return String((error as EmailJSResponseStatus).text);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'UNKNOWN';
};
