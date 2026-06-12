import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { processSendMessageRequest } from './api/lib/chatMessage';

const createApiDevPlugin = (env: Record<string, string>): Plugin => ({
  name: 'chat-api-dev-server',
  configureServer(server) {
    server.middlewares.use('/api/send-message', async (request, response) => {
      if (request.method !== 'POST') {
        response.statusCode = 405;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ success: false, error: 'Method not allowed.' }));
        return;
      }

      try {
        const chunks: Buffer[] = [];

        for await (const chunk of request) {
          chunks.push(Buffer.from(chunk));
        }

        const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
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
    plugins: [react(), createApiDevPlugin(env)],
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
