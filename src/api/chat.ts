import axios from 'axios';
import type { ChatMessageFormValues, SendChatMessageResponse } from '@/types/chat';

const chatApi = axios.create({
  baseURL: '/api',
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      }

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
