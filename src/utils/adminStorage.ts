import { ADMIN_SEED_DATA } from '@/api/mocks/admin';
import type { AdminState } from '@/types/admin';
import { mergeAdminState } from '@/utils/mergeAdminState';

const STORAGE_KEY = 'dream-celebrate-admin';

export const loadAdminStateFromLocalStorage = (): AdminState => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return mergeAdminState(null);
  }

  try {
    return mergeAdminState(JSON.parse(stored) as Partial<AdminState>);
  } catch {
    return mergeAdminState(null);
  }
};

export const saveAdminStateToLocalStorage = (state: AdminState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const clearAdminStateFromLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/** @deprecated Use fetchAdminState from @/api/adminState */
export const loadAdminState = (): AdminState => loadAdminStateFromLocalStorage();

/** @deprecated Use saveAdminStateRemote from @/api/adminState */
export const saveAdminState = (state: AdminState) => {
  saveAdminStateToLocalStorage(state);
};

/** @deprecated Use resetAdminStateRemote from @/api/adminState */
export const resetAdminState = (): AdminState => {
  clearAdminStateFromLocalStorage();
  return ADMIN_SEED_DATA;
};
