import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/utils/isSupabaseConfigured';

type AdminAuthContextValue = Readonly<{
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured());
  const isAuthRequired = isSupabaseConfigured();

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session);
        setIsLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setSession(null);
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
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
