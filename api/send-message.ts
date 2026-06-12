import { parseRequestBody, processSendMessageRequest } from './lib/chatMessage';

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
  // #region agent log
  fetch('http://127.0.0.1:7733/ingest/a202e5c3-9902-41d8-81d9-a6873062a80b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'36ced1'},body:JSON.stringify({sessionId:'36ced1',location:'api/send-message.ts:handler-entry',message:'handler invoked',data:{method:request.method,bodyType:typeof request.body,hasBotToken:Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim()),hasChatId:Boolean(process.env.TELEGRAM_CHAT_ID?.trim())},timestamp:Date.now(),hypothesisId:'A-B'})}).catch(()=>{});
  // #endregion

  response.setHeader('Content-Type', 'application/json');

  try {
    if (request.method !== 'POST') {
      response.status(405).json({
        success: false,
        error: 'Method not allowed.',
      });
      return;
    }

    const result = await processSendMessageRequest(parseRequestBody(request.body), process.env);

    // #region agent log
    fetch('http://127.0.0.1:7733/ingest/a202e5c3-9902-41d8-81d9-a6873062a80b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'36ced1'},body:JSON.stringify({sessionId:'36ced1',location:'api/send-message.ts:handler-result',message:'processSendMessageRequest finished',data:{ok:result.ok,status:result.status,error:result.error},timestamp:Date.now(),hypothesisId:'A-C-E'})}).catch(()=>{});
    // #endregion

    if (!result.ok) {
      response.status(result.status).json({
        success: false,
        error: result.error,
      });
      return;
    }

    response.status(200).json({ success: true });
  } catch (error) {
    const crashMessage = error instanceof Error ? error.message : 'Unknown server error';

    // #region agent log
    fetch('http://127.0.0.1:7733/ingest/a202e5c3-9902-41d8-81d9-a6873062a80b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'36ced1'},body:JSON.stringify({sessionId:'36ced1',location:'api/send-message.ts:handler-crash',message:'handler threw',data:{crashMessage},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    response.status(500).json({
      success: false,
      error: crashMessage,
    });
  }
}
