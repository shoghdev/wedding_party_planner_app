import emailjs from '@emailjs/browser';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import '@/i18n';
import '@/styles/global.css';
import '@/styles/variables.css';

const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

if (emailJsPublicKey && emailJsPublicKey !== 'your_public_key') {
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
