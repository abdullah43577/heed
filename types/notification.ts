export type NotificationType = "SYSTEM" | "ACCOUNT_NEEDS_REAUTH" | "DAILY_REPORT" | "BACKLOG_READY" | "DRAFTS_READY";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  readAt?: string | null;
  entityType?: string | null;
  entityId?: string | null;
  createdAt: string;
}

export interface UnreadCount {
  count: number;
}

export interface RegisterDeviceRequest {
  deviceToken: string;
  deviceType?: string;
}
