import { parseRequestBody, processSendMessageRequest } from '../lib/telegramMessage';

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
 * Vercel serverless handler: forwards website chat messages to Telegram.
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
