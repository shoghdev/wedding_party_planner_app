export type AdminCredentials = Readonly<{
  email: string;
  password: string;
}>;

const ADMIN_SESSION_KEY = 'dream_admin_session';

export type StoredAdminSession = Readonly<{
  email: string;
}>;

/** Login page is always available. */
export const isLocalAdminAuthConfigured = (): boolean => true;

export const validateAdminCredentials = (email: string, password: string): boolean => {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  return trimmedEmail.includes('@') && trimmedPassword.length > 0;
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
