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
  isAdminAuthRequired,
  loadAdminSession,
  saveAdminSession,
  validateAdminCredentials,
  type AdminSession,
} from '@/utils/adminAuth';

type AdminAuthContextValue = Readonly<{
  session: AdminSession | null;
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
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthRequired = isAdminAuthRequired();

  useEffect(() => {
    setSession(loadAdminSession());
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!validateAdminCredentials(email, password)) {
      throw new Error('Invalid credentials');
    }

    const nextSession = { email: email.trim() };
    saveAdminSession(nextSession.email);
    setSession(nextSession);
  }, []);

  const signOut = useCallback(async () => {
    clearAdminSession();
    setSession(null);
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      session,
      isLoading,
      isAuthRequired,
      signIn,
      signOut,
    }),
    [isAuthRequired, isLoading, session, signIn, signOut],
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
