import { CATEGORY_COLORS_BY_SCHEME } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { NotificationType } from "../../types/notification";

interface NotificationMeta {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export const NOTIFICATION_META = {
  SYSTEM: { icon: "sparkles-outline", color: CATEGORY_COLORS_BY_SCHEME.light.NEEDS_REPLY },
} as const satisfies Record<NotificationType, NotificationMeta>;

const NOTIFICATION_ROUTES: Partial<Record<string, string>> = {};

export const notificationTarget = function (notification: {
  entityType?: string | null;
  entityId?: string | null;
}) {
  const route = notification.entityType && NOTIFICATION_ROUTES[notification.entityType];
  if (!route || !notification.entityId) return null;

  return { pathname: route as any, params: { id: notification.entityId } };
};
