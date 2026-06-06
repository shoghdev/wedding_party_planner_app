export type AdminCredentials = Readonly<{
  email: string;
  password: string;
}>;

const ADMIN_SESSION_KEY = 'dream_admin_session';

export type StoredAdminSession = Readonly<{
  email: string;
}>;

export const getAdminCredentials = (): AdminCredentials | null => {
  const email = import.meta.env.VITE_ADMIN_EMAIL?.trim();
  const password = import.meta.env.VITE_ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    return null;
  }

  if (email === 'admin@example.com' || password === 'your_admin_password') {
    return null;
  }

  return { email, password };
};

export const isLocalAdminAuthConfigured = (): boolean => getAdminCredentials() !== null;

export const validateAdminCredentials = (email: string, password: string): boolean => {
  const credentials = getAdminCredentials();

  if (!credentials) {
    return false;
  }

  return email.trim() === credentials.email && password === credentials.password;
};

export const readAdminSession = (): StoredAdminSession | null => {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredAdminSession;

    if (typeof parsed.email !== 'string' || !parsed.email.trim()) {
      return null;
    }

    return { email: parsed.email };
  } catch {
    return null;
  }
};

export const writeAdminSession = (session: StoredAdminSession): void => {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

export const clearAdminSession = (): void => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
};
