import { ADMIN_SEED_DATA } from '@/api/mocks/admin';
import { getSupabaseClient } from '@/lib/supabase';
import type { AdminState } from '@/types/admin';
import { isSupabaseConfigured } from '@/utils/isSupabaseConfigured';
import { mergeAdminState } from '@/utils/mergeAdminState';
import { loadAdminStateFromLocalStorage, saveAdminStateToLocalStorage } from '@/utils/adminStorage';

const SITE_CONTENT_ID = 'main';

export const fetchAdminState = async (): Promise<AdminState> => {
  if (!isSupabaseConfigured()) {
    return loadAdminStateFromLocalStorage();
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return loadAdminStateFromLocalStorage();
  }

  const { data, error } = await supabase
    .from('site_content')
    .select('data')
    .eq('id', SITE_CONTENT_ID)
    .maybeSingle();

  if (error || !data) {
    return loadAdminStateFromLocalStorage();
  }

  return mergeAdminState(data.data);
};

export const saveAdminStateRemote = async (state: AdminState): Promise<void> => {
  saveAdminStateToLocalStorage(state);

  if (!isSupabaseConfigured()) {
    return;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return;
  }

  const { error } = await supabase.from('site_content').upsert({
    id: SITE_CONTENT_ID,
    data: state,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }
};

export const resetAdminStateRemote = async (): Promise<AdminState> => {
  const seedState = mergeAdminState(null);
  saveAdminStateToLocalStorage(seedState);

  if (!isSupabaseConfigured()) {
    return seedState;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return seedState;
  }

  const { error } = await supabase.from('site_content').upsert({
    id: SITE_CONTENT_ID,
    data: ADMIN_SEED_DATA,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }

  return seedState;
};
