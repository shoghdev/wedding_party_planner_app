/** Serverless handler + Telegram delivery (single file for reliable Vercel ESM deployment). */

export type ChatMessagePayload = Readonly<{
  name: string;
  email: string;
  message: string;
}>;

export type SendMessageResult = Readonly<{
  ok: boolean;
  status: number;
  error?: string;
}>;

type ChatMessageValidationResult =
  | { valid: true; data: ChatMessagePayload }
  | { valid: false; error: string };

const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MAX_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_REQUEST_TIMEOUT_MS = 8_000;

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

const validateChatMessage = (body: unknown): ChatMessageValidationResult => {
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

  return { valid: true, data: { name, email, message } };
};

const formatTelegramMessage = (data: ChatMessagePayload): string =>
  [
    'New Website Message',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    '',
    'Message:',
    data.message,
  ].join('\n');

const getTelegramConfigFromEnv = (
  env: Record<string, string | undefined>,
): { botToken: string; chatId: string } | null => {
  const botToken = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return null;
  }

  return { botToken, chatId };
};

const sendMessageToTelegram = async (
  data: ChatMessagePayload,
  config: { botToken: string; chatId: string },
): Promise<SendMessageResult> => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatTelegramMessage(data),
      }),
      signal: AbortSignal.timeout(TELEGRAM_REQUEST_TIMEOUT_MS),
    });

    let payload: { ok: boolean; description?: string } | null = null;

    try {
      payload = (await response.json()) as { ok: boolean; description?: string };
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
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return {
        ok: false,
        status: 504,
        error: 'Telegram API timed out. Please try again.',
      };
    }

    return {
      ok: false,
      status: 502,
      error: 'Failed to deliver message to Telegram.',
    };
  }
};

export const processSendMessageRequest = async (
  body: unknown,
  env: Record<string, string | undefined>,
): Promise<SendMessageResult> => {
  const validation = validateChatMessage(body);

  if (validation.valid === false) {
    return { ok: false, status: 400, error: validation.error };
  }

  const telegramConfig = getTelegramConfigFromEnv(env);

  if (!telegramConfig) {
    return {
      ok: false,
      status: 500,
      error: 'Telegram is not configured on the server.',
    };
  }

  return sendMessageToTelegram(validation.data, telegramConfig);
};

type VercelRequest = Readonly<{
  method?: string;
  body?: unknown;
}>;

type VercelResponse = Readonly<{
  setHeader: (name: string, value: string) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
  json: (data: unknown) => void;
}>;

/**
 * Vercel serverless handler (Node req/res — widest compatibility on Vercel).
 */
export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('Content-Type', 'application/json');

  if (request.method !== 'POST') {
    response.status(405).json({ success: false, error: 'Method not allowed.' });
    return;
  }

  try {
    const result = await processSendMessageRequest(
      parseRequestBody(request.body),
      process.env,
    );

    if (!result.ok) {
      response.status(result.status).json({ success: false, error: result.error });
      return;
    }

    response.status(200).json({ success: true });
  } catch (error) {
    const crashMessage = error instanceof Error ? error.message : 'Unknown server error';
    response.status(500).json({ success: false, error: crashMessage });
  }
}
