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
import { getSupabaseClient } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/utils/isSupabaseConfigured';

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
  const [isLoading, setIsLoading] = useState(
    isSupabaseConfigured() || isLocalAdminAuthConfigured(),
  );
  const isAuthRequired = isSupabaseConfigured() || isLocalAdminAuthConfigured();

  useEffect(() => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();

      if (!supabase) {
        setIsLoading(false);
        return;
      }

      let isMounted = true;

      void supabase.auth.getSession().then(({ data }) => {
        if (!isMounted) {
          return;
        }

        const email = data.session?.user.email ?? null;
        setIsAuthenticated(Boolean(data.session));
        setUserEmail(email);
        setIsLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(Boolean(session));
        setUserEmail(session?.user.email ?? null);
        setIsLoading(false);
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    const storedSession = readAdminSession();
    setIsAuthenticated(Boolean(storedSession));
    setUserEmail(storedSession?.email ?? null);
    setIsLoading(false);

    return undefined;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();

      if (!supabase) {
        throw new Error('Supabase is not configured');
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      return;
    }

    if (!validateAdminCredentials(email, password)) {
      throw new Error('Invalid credentials');
    }

    const normalizedEmail = email.trim();
    writeAdminSession({ email: normalizedEmail });
    setIsAuthenticated(true);
    setUserEmail(normalizedEmail);
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();

      if (supabase) {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }
      }
    }

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
