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
 * Sends a website chat message to the serverless API, which forwards it to Telegram.
 */
export const sendChatMessage = async (values: ChatMessageFormValues): Promise<void> => {
  try {
    const { data } = await chatApi.post<SendChatMessageResponse>('/send-message', values);

    if (!data.success) {
      throw new Error(data.error ?? 'UNKNOWN');
    }
  } catch (error) {
    if (isTimeoutError(error)) {
      throw new Error(
        'The chat service did not respond. Restart the dev server (pnpm run dev) or redeploy on Vercel.',
      );
    }

    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const structuredError =
        typeof responseData === 'object' && responseData !== null
          ? (responseData as SendChatMessageResponse & { message?: string })
          : undefined;
      const serverError = structuredError?.error ?? structuredError?.message;

      if (serverError) {
        throw new Error(serverError);
      }
    }

    throw error;
  }
};
