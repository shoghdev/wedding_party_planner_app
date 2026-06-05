import { ADMIN_SEED_DATA } from '@/api/mocks/admin';
import type { AdminState } from '@/types/admin';

export const mergeAdminState = (partial: Partial<AdminState> | null | undefined): AdminState => ({
  ...ADMIN_SEED_DATA,
  ...(partial ?? {}),
});
