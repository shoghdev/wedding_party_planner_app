import { useCallback, useMemo, useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import type { AdminNotification } from '@/types/adminNotification';
import { buildAdminNotifications } from '@/utils/buildAdminNotifications';

const STORAGE_KEY = 'admin-read-notification-ids';

const readStoredIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set();
  }
};

const persistReadIds = (ids: Set<string>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
};

export const useAdminNotifications = () => {
  const { state } = useAdmin();
  const [readIds, setReadIds] = useState<Set<string>>(readStoredIds);

  const notifications = useMemo(() => buildAdminNotifications(state), [state]);

  const unreadNotifications = useMemo(
    () => notifications.filter((notification) => !readIds.has(notification.id)),
    [notifications, readIds],
  );

  const markAsRead = useCallback((id: string) => {
    setReadIds((current) => {
      if (current.has(id)) {
        return current;
      }

      const next = new Set(current);
      next.add(id);
      persistReadIds(next);
      return next;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setReadIds((current) => {
      const next = new Set(current);

      notifications.forEach((notification) => {
        next.add(notification.id);
      });

      persistReadIds(next);
      return next;
    });
  }, [notifications]);

  const isUnread = useCallback(
    (notification: AdminNotification) => !readIds.has(notification.id),
    [readIds],
  );

  return {
    notifications,
    unreadCount: unreadNotifications.length,
    markAsRead,
    markAllAsRead,
    isUnread,
  };
};
