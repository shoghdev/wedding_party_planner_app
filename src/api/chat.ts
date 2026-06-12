import axios from 'axios';
import { api } from '@/api/index';
import type { ChatMessageFormValues, SendChatMessageResponse } from '@/types/chat';

/**
 * Sends a website chat message to the serverless API, which forwards it to Telegram.
 */
export const sendChatMessage = async (values: ChatMessageFormValues): Promise<void> => {
  try {
    const { data } = await api.post<SendChatMessageResponse>('/send-message', values);

    if (!data.success) {
      throw new Error(data.error ?? 'UNKNOWN');
    }
  } catch (error) {
    const axiosStatus = axios.isAxiosError(error) ? error.response?.status : undefined;
    const axiosErrorBody = axios.isAxiosError(error)
      ? (error.response?.data as SendChatMessageResponse | undefined)
      : undefined;
    const serverError = axiosErrorBody?.error;

    // #region agent log
    fetch('http://127.0.0.1:7733/ingest/a202e5c3-9902-41d8-81d9-a6873062a80b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'36ced1'},body:JSON.stringify({sessionId:'36ced1',location:'src/api/chat.ts:sendChatMessage-catch',message:'sendChatMessage failed',data:{axiosStatus,serverError,axiosMessage:axios.isAxiosError(error)?error.message:undefined},timestamp:Date.now(),hypothesisId:'A-E'})}).catch(()=>{});
    // #endregion

    if (serverError) {
      throw new Error(serverError);
    }

    throw error;
  }
};
