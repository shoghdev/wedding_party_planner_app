export type AdminNotificationKind = 'pendingBooking' | 'draftContent' | 'upcomingEvent';

export type AdminNotification = Readonly<{
  id: string;
  kind: AdminNotificationKind;
  titleKey: string;
  messageKey: string;
  messageValues: Record<string, string>;
  path: string;
  createdAt: string;
}>;
