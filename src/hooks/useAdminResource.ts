import { useMemo, useState } from 'react';
import type { AdminListRecord, AdminListSectionKey } from '@/types/admin';
import { useAdmin } from '@/hooks/useAdmin';

type UseAdminResourceOptions = Readonly<{
  section: AdminListSectionKey;
  searchFields: (keyof AdminListRecord)[];
  statusField?: string;
}>;

export const useAdminResource = ({
  section,
  searchFields,
  statusField = 'status',
}: UseAdminResourceOptions) => {
  const { state, addItem, updateItem, removeItem, removeItems, createItemId } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<AdminListRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = state[section] as AdminListRecord[];

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        searchFields.some((field) =>
          String(item[field as keyof AdminListRecord] ?? '')
            .toLowerCase()
            .includes(query),
        );

      const itemStatus = item[statusField as keyof AdminListRecord];
      const matchesStatus =
        statusFilter === 'all' || itemStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, searchFields, statusField, statusFilter]);

  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdminListRecord) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const saveItem = (item: AdminListRecord) => {
    if (editingItem) {
      updateItem(section, item);
    } else {
      addItem(section, item);
    }

    closeModal();
  };

  const deleteSelected = () => {
    removeItems(section, selectedIds);
    setSelectedIds([]);
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
  };

  return {
    items: filteredItems,
    allItems: items,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedIds,
    setSelectedIds,
    editingItem,
    isModalOpen,
    openCreateModal,
    openEditModal,
    closeModal,
    saveItem,
    deleteItem: (id: string) => removeItem(section, id),
    deleteSelected,
    resetFilters,
    createItemId,
  };
};
