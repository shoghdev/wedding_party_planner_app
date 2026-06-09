import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAdminSession,
  isLocalAdminAuthConfigured,
  readAdminSession,
  validateAdminCredentials,
  writeAdminSession,
} from '@/config/adminAuth';

type AdminAuthContextValue = Readonly<{
  isAuthenticated: boolean;
  userEmail: string | null;
  isLoading: boolean;
  isAuthRequired: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}>;

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

type AdminAuthProviderProps = Readonly<{
  children: ReactNode;
}>;

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isLocalAdminAuthConfigured());
  const isAuthRequired = isLocalAdminAuthConfigured();

  useEffect(() => {
    const storedSession = readAdminSession();
    setIsAuthenticated(Boolean(storedSession));
    setUserEmail(storedSession?.email ?? null);
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!validateAdminCredentials(email, password)) {
      throw new Error('Invalid credentials');
    }

    const normalizedEmail = email.trim();
    writeAdminSession({ email: normalizedEmail });
    setIsAuthenticated(true);
    setUserEmail(normalizedEmail);
  }, []);

  const signOut = useCallback(async () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setUserEmail(null);
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isAuthenticated,
      userEmail,
      isLoading,
      isAuthRequired,
      signIn,
      signOut,
    }),
    [isAuthRequired, isAuthenticated, isLoading, signIn, signOut, userEmail],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }

  return context;
};
