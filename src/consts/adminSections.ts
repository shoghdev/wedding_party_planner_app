import type { AdminStatus } from '@/types/admin';

export type AdminFieldType = 'text' | 'textarea' | 'select' | 'number' | 'date' | 'url' | 'boolean';

export type AdminFieldOption = Readonly<{
  value: string;
  labelKey: string;
}>;

export type AdminFieldConfig = Readonly<{
  name: string;
  labelKey: string;
  type: AdminFieldType;
  required?: boolean;
  options?: readonly AdminFieldOption[];
}>;

export type AdminListSectionConfig = Readonly<{
  sectionKey: string;
  titleKey: string;
  descriptionKey: string;
  breadcrumbsKey: string;
  createLabelKey: string;
  exportLabelKey: string;
  searchPlaceholderKey: string;
  searchFields: readonly string[];
  hasStatusFilter?: boolean;
  statusOptions?: readonly AdminFieldOption[];
  fields: readonly AdminFieldConfig[];
  defaultValues: Record<string, string | number>;
  getDetailTitle: (record: Record<string, unknown>) => string;
  getDetailMeta?: (record: Record<string, unknown>) => string;
  getImageUrl?: (record: Record<string, unknown>) => string | undefined;
  tableColumns: readonly ('detail' | 'date' | 'location' | 'status' | 'category' | 'rating' | 'email' | 'code')[];
}>;

export const ADMIN_STATUS_OPTIONS: readonly AdminFieldOption[] = [
  { value: 'published', labelKey: 'admin.status.published' },
  { value: 'draft', labelKey: 'admin.status.draft' },
  { value: 'archived', labelKey: 'admin.status.archived' },
] as const;

export const ADMIN_BOOKING_STATUS_OPTIONS: readonly AdminFieldOption[] = [
  { value: 'pending', labelKey: 'admin.status.pending' },
  { value: 'confirmed', labelKey: 'admin.status.confirmed' },
  { value: 'cancelled', labelKey: 'admin.status.cancelled' },
] as const;

export const getDefaultStatusFilter = (): 'all' | AdminStatus => 'all';
