/** Shared chat message types, validation, and Telegram delivery (server-side only). */

export type ChatMessagePayload = Readonly<{
  name: string;
  email: string;
  message: string;
}>;

export type ChatMessageValidationResult =
  | { valid: true; data: ChatMessagePayload }
  | { valid: false; error: string };

export type TelegramConfig = Readonly<{
  botToken: string;
  chatId: string;
}>;

export type SendMessageResult = Readonly<{
  ok: boolean;
  status: number;
  error?: string;
}>;

const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MAX_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalizes Vercel/Node request bodies that may arrive as JSON objects or raw strings.
 */
export const parseRequestBody = (body: unknown): unknown => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as unknown;
    } catch {
      return body;
    }
  }

  return body;
};

/**
 * Validates and normalizes the incoming chat message body.
 */
export const validateChatMessage = (body: unknown): ChatMessageValidationResult => {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === 'string' ? record.name.trim() : '';
  const email = typeof record.email === 'string' ? record.email.trim() : '';
  const message = typeof record.message === 'string' ? record.message.trim() : '';

  if (!name) {
    return { valid: false, error: 'Name is required.' };
  }

  if (name.length > NAME_MAX_LENGTH) {
    return { valid: false, error: `Name must be ${NAME_MAX_LENGTH} characters or fewer.` };
  }

  if (!email) {
    return { valid: false, error: 'Email is required.' };
  }

  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { valid: false, error: 'A valid email address is required.' };
  }

  if (!message) {
    return { valid: false, error: 'Message is required.' };
  }

  if (message.length > MESSAGE_MAX_LENGTH) {
    return {
      valid: false,
      error: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`,
    };
  }

  return {
    valid: true,
    data: { name, email, message },
  };
};

/**
 * Formats the Telegram notification text for a website chat message.
 */
export const formatTelegramMessage = (data: ChatMessagePayload): string =>
  [
    'New Website Message',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    '',
    'Message:',
    data.message,
  ].join('\n');

/**
 * Reads Telegram credentials from server environment variables.
 */
export const getTelegramConfigFromEnv = (
  env: Record<string, string | undefined>,
): TelegramConfig | null => {
  const botToken = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return null;
  }

  return { botToken, chatId };
};

type TelegramApiResponse = Readonly<{
  ok: boolean;
  description?: string;
}>;

/**
 * Sends a validated message to the configured Telegram chat via Bot API.
 */
export const sendMessageToTelegram = async (
  data: ChatMessagePayload,
  config: TelegramConfig,
): Promise<SendMessageResult> => {
  const response = await fetch(
    `https://api.telegram.org/bot${config.botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatTelegramMessage(data),
      }),
    },
  );

  let payload: TelegramApiResponse | null = null;

  try {
    payload = (await response.json()) as TelegramApiResponse;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.ok) {
    return {
      ok: false,
      status: 502,
      error: payload?.description ?? 'Failed to deliver message to Telegram.',
    };
  }

  return { ok: true, status: 200 };
};

/**
 * Validates the request body and forwards the message to Telegram.
 */
export const processSendMessageRequest = async (
  body: unknown,
  env: Record<string, string | undefined>,
): Promise<SendMessageResult> => {
  const validation = validateChatMessage(body);

  if (!validation.valid) {
    return { ok: false, status: 400, error: validation.error };
  }

  const telegramConfig = getTelegramConfigFromEnv(env);

  // #region agent log
  fetch('http://127.0.0.1:7733/ingest/a202e5c3-9902-41d8-81d9-a6873062a80b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'36ced1'},body:JSON.stringify({sessionId:'36ced1',location:'api/lib/chatMessage.ts:processSendMessageRequest',message:'telegram config check',data:{hasBotToken:Boolean(env.TELEGRAM_BOT_TOKEN?.trim()),hasChatId:Boolean(env.TELEGRAM_CHAT_ID?.trim()),configFound:Boolean(telegramConfig)},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  if (!telegramConfig) {
    return {
      ok: false,
      status: 500,
      error: 'Telegram is not configured on the server.',
    };
  }

  const telegramResult = await sendMessageToTelegram(validation.data, telegramConfig);

  // #region agent log
  fetch('http://127.0.0.1:7733/ingest/a202e5c3-9902-41d8-81d9-a6873062a80b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'36ced1'},body:JSON.stringify({sessionId:'36ced1',location:'api/lib/chatMessage.ts:sendMessageToTelegram-result',message:'telegram api result',data:{ok:telegramResult.ok,status:telegramResult.status,error:telegramResult.error},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  return telegramResult;
};
