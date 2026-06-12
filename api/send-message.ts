import { processSendMessageRequest } from './lib/chatMessage';

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
 * Vercel serverless handler: accepts website chat messages and forwards them to Telegram.
 * Token and chat ID are read from server environment variables only.
 */
export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('Content-Type', 'application/json');

  if (request.method !== 'POST') {
    response.status(405).json({
      success: false,
      error: 'Method not allowed.',
    });
    return;
  }

  const result = await processSendMessageRequest(request.body, process.env);

  if (!result.ok) {
    response.status(result.status).json({
      success: false,
      error: result.error,
    });
    return;
  }

  response.status(200).json({ success: true });
}
