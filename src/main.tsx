import '@/setupI18nNotice';
import emailjs from '@emailjs/browser';
import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import '@/i18n';
import '@/styles/animations.css';
import '@/styles/variables.css';
import '@/styles/layout.css';
import '@/styles/global.css';

const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
const isAdminRoute =
  typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

if (emailJsPublicKey && emailJsPublicKey !== 'your_public_key' && !isAdminRoute) {
  emailjs.init({ publicKey: emailJsPublicKey });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
