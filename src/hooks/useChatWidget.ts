import { App } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendChatMessage } from '@/api/chat';
import type { ChatMessageFormValues } from '@/types/chat';

export const useChatWidget = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const openWidget = () => setOpen(true);

  const closeWidget = () => setOpen(false);

  const submitMessage = async (values: ChatMessageFormValues) => {
    setSubmitting(true);

    try {
      await sendChatMessage(values);
      message.success(t('chat.success'));
      setOpen(false);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'UNKNOWN';

      if (import.meta.env.DEV) {
        console.error('[Chat widget → Telegram]', error);
      }

      message.error(
        errorMessage === 'UNKNOWN'
          ? t('chat.error')
          : t('chat.errorWithReason', { reason: errorMessage }),
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    open,
    submitting,
    openWidget,
    closeWidget,
    submitMessage,
  };
};
