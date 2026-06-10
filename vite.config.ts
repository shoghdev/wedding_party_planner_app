import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
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
});
