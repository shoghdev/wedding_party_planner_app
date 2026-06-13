import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage } from 'node:http';
import { fileURLToPath, URL } from 'node:url';
import { processSendMessageRequest } from './api/send-message';

const readRequestBody = (request: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    request.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    request.on('error', reject);
  });

const createApiDevPlugin = (env: Record<string, string>): Plugin => ({
  name: 'chat-api-dev-server',
  enforce: 'pre',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const requestUrl = request.url?.split('?')[0];

      if (requestUrl !== '/api/send-message') {
        next();
        return;
      }

      if (request.method !== 'POST') {
        response.statusCode = 405;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ success: false, error: 'Method not allowed.' }));
        return;
      }

      try {
        const rawBody = await readRequestBody(request);
        const body = rawBody.length > 0 ? (JSON.parse(rawBody) as unknown) : undefined;
        const result = await processSendMessageRequest(body, env);

        response.statusCode = result.status;
        response.setHeader('Content-Type', 'application/json');
        response.end(
          JSON.stringify(
            result.ok ? { success: true } : { success: false, error: result.error },
          ),
        );
      } catch {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ success: false, error: 'Invalid request body.' }));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [createApiDevPlugin(env), react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              return undefined;
            }

            if (id.includes('@ant-design/icons')) {
              return 'vendor-antd-icons';
            }

            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }

            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }

            if (id.includes('@emailjs')) {
              return 'vendor-emailjs';
            }

            return undefined;
          },
        },
      },
      chunkSizeWarningLimit: 700,
    },
  };
});
