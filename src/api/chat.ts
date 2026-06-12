import { api } from '@/api/index';
import type { ChatMessageFormValues, SendChatMessageResponse } from '@/types/chat';

/**
 * Sends a website chat message to the serverless API, which forwards it to Telegram.
 */
export const sendChatMessage = async (values: ChatMessageFormValues): Promise<void> => {
  const { data } = await api.post<SendChatMessageResponse>('/send-message', values);

  if (!data.success) {
    throw new Error(data.error ?? 'UNKNOWN');
  }
};
