const SESSION_KEY = 'dream-celebrate-admin-session';

export type AdminSession = Readonly<{
  email: string;
}>;

const getConfiguredEmail = (): string | undefined =>
  import.meta.env.VITE_ADMIN_EMAIL?.trim() || undefined;

const getConfiguredPassword = (): string | undefined =>
  import.meta.env.VITE_ADMIN_PASSWORD || undefined;

export const isAdminAuthRequired = (): boolean =>
  Boolean(getConfiguredEmail() && getConfiguredPassword());

export const loadAdminSession = (): AdminSession | null => {
  const stored = sessionStorage.getItem(SESSION_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as AdminSession;
  } catch {
    return null;
  }
};

export const saveAdminSession = (email: string) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
};

export const clearAdminSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const validateAdminCredentials = (email: string, password: string): boolean => {
  const configuredEmail = getConfiguredEmail();
  const configuredPassword = getConfiguredPassword();

  if (!configuredEmail || !configuredPassword) {
    return false;
  }

  return configuredEmail === email.trim() && configuredPassword === password;
};
