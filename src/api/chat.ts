import axios from 'axios';
import type { ChatMessageFormValues, SendChatMessageResponse } from '@/types/chat';

const chatApi = axios.create({
  baseURL: '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTimeoutError = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return (
    error.code === 'ECONNABORTED' ||
    (typeof error.message === 'string' && error.message.includes('timeout'))
  );
};

/**
 * Normalizes any server/error payload into a readable string.
 *
 * Handles plain strings, our `{ error: string }` shape, and Vercel's platform
 * error envelope `{ error: { code, message } }` so the UI never shows
 * "[object Object]".
 */
const extractErrorMessage = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value.trim() || undefined;
  }

  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const record = value as Record<string, unknown>;

  // Nested error object: { error: {...} } or { error: "..." }
  if ('error' in record) {
    const nested = extractErrorMessage(record.error);
    if (nested) {
      return nested;
    }
  }

  // Vercel/platform shape: { code, message }
  const message = typeof record.message === 'string' ? record.message.trim() : '';
  const code = typeof record.code === 'string' ? record.code.trim() : '';

  if (message && code) {
    return `${message} (${code})`;
  }

  return message || code || undefined;
};

/**
 * Sends a website chat message to the serverless API, which forwards it to Telegram.
 */
export const sendChatMessage = async (values: ChatMessageFormValues): Promise<void> => {
  try {
    const { data } = await chatApi.post<SendChatMessageResponse>('/send-message', values);

    if (!data.success) {
      throw new Error(extractErrorMessage(data) ?? 'UNKNOWN');
    }
  } catch (error) {
    if (error instanceof Error && !axios.isAxiosError(error)) {
      throw error;
    }

    if (isTimeoutError(error)) {
      throw new Error(
        'The chat service did not respond in time. Please try again, or redeploy on Vercel.',
      );
    }

    if (axios.isAxiosError(error)) {
      const serverError = extractErrorMessage(error.response?.data);

      if (serverError) {
        throw new Error(serverError);
      }

      if (error.response?.status) {
        throw new Error(`Server responded with status ${error.response.status}.`);
      }
    }

    throw new Error('Could not reach the chat service. Please try again.');
  }
};
