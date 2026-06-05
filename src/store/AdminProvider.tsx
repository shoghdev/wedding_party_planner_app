import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Spin } from 'antd';
import { fetchAdminState, resetAdminStateRemote, saveAdminStateRemote } from '@/api/adminState';
import { ADMIN_SEED_DATA } from '@/api/mocks/admin';
import type {
  AdminContentSectionKey,
  AdminListRecord,
  AdminListSectionKey,
  AdminState,
} from '@/types/admin';
import { isSupabaseConfigured } from '@/utils/isSupabaseConfigured';
import { createId } from '@/utils/createId';

type AdminContextValue = Readonly<{
  state: AdminState;
  isLoading: boolean;
  isSaving: boolean;
  updateContent: <K extends AdminContentSectionKey>(
    section: K,
    value: AdminState[K],
  ) => void;
  updateSettings: (value: AdminState['settings']) => void;
  addItem: (section: AdminListSectionKey, item: AdminListRecord) => void;
  updateItem: (section: AdminListSectionKey, item: AdminListRecord) => void;
  removeItem: (section: AdminListSectionKey, id: string) => void;
  removeItems: (section: AdminListSectionKey, ids: string[]) => void;
  resetData: () => Promise<void>;
  createItemId: (prefix?: string) => string;
}>;

const AdminContext = createContext<AdminContextValue | null>(null);

type AdminProviderProps = Readonly<{
  children: ReactNode;
}>;

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [state, setState] = useState<AdminState>(ADMIN_SEED_DATA);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadState = async () => {
      try {
        const remoteState = await fetchAdminState();

        if (isMounted) {
          setState(remoteState);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadState();

    return () => {
      isMounted = false;
    };
  }, []);

  const persist = useCallback((updater: AdminState | ((current: AdminState) => AdminState)) => {
    setState((current) => {
      const nextState = typeof updater === 'function' ? updater(current) : updater;

      setIsSaving(true);
      void saveAdminStateRemote(nextState)
        .catch((error) => {
          console.error('Failed to save admin state', error);
        })
        .finally(() => {
          setIsSaving(false);
        });

      return nextState;
    });
  }, []);

  const updateContent = useCallback<AdminContextValue['updateContent']>((section, value) => {
    persist((current) => ({ ...current, [section]: value }));
  }, [persist]);

  const updateSettings = useCallback<AdminContextValue['updateSettings']>((value) => {
    persist((current) => ({ ...current, settings: value }));
  }, [persist]);

  const addItem = useCallback<AdminContextValue['addItem']>((section, item) => {
    persist((current) => {
      const list = current[section] as AdminListRecord[];
      return { ...current, [section]: [...list, item] };
    });
  }, [persist]);

  const updateItem = useCallback<AdminContextValue['updateItem']>((section, item) => {
    persist((current) => {
      const list = current[section] as AdminListRecord[];
      return {
        ...current,
        [section]: list.map((entry) => (entry.id === item.id ? item : entry)),
      };
    });
  }, [persist]);

  const removeItem = useCallback<AdminContextValue['removeItem']>((section, id) => {
    persist((current) => {
      const list = current[section] as AdminListRecord[];
      return { ...current, [section]: list.filter((entry) => entry.id !== id) };
    });
  }, [persist]);

  const removeItems = useCallback<AdminContextValue['removeItems']>((section, ids) => {
    const idSet = new Set(ids);
    persist((current) => {
      const list = current[section] as AdminListRecord[];
      return { ...current, [section]: list.filter((entry) => !idSet.has(entry.id)) };
    });
  }, [persist]);

  const resetData = useCallback(async () => {
    setIsSaving(true);

    try {
      const seedState = await resetAdminStateRemote();
      setState(seedState);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      state,
      isLoading,
      isSaving,
      updateContent,
      updateSettings,
      addItem,
      updateItem,
      removeItem,
      removeItems,
      resetData,
      createItemId: createId,
    }),
    [
      addItem,
      isLoading,
      isSaving,
      removeItem,
      removeItems,
      resetData,
      state,
      updateContent,
      updateItem,
      updateSettings,
    ],
  );

  if (isLoading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdminContext must be used within AdminProvider');
  }

  return context;
};
