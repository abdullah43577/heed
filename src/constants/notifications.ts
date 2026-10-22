import { CATEGORY_COLORS_BY_SCHEME } from "@/constants/theme";
import { FileText, Inbox, Link, PenLine, Sparkles, type LucideIcon } from "lucide-react-native";
import { NotificationType } from "../../types/notification";

interface NotificationMeta {
  icon: LucideIcon;
  color: string;
}

export const NOTIFICATION_META = {
  SYSTEM: { icon: Sparkles, color: CATEGORY_COLORS_BY_SCHEME.light.NEEDS_REPLY },
  ACCOUNT_NEEDS_REAUTH: { icon: Link, color: CATEGORY_COLORS_BY_SCHEME.light.IMPORTANT },
  DAILY_REPORT: { icon: FileText, color: CATEGORY_COLORS_BY_SCHEME.light.NEEDS_REPLY },
  BACKLOG_READY: { icon: Inbox, color: CATEGORY_COLORS_BY_SCHEME.light.NEEDS_REPLY },
  DRAFTS_READY: { icon: PenLine, color: CATEGORY_COLORS_BY_SCHEME.light.NEEDS_REPLY },
} as const satisfies Record<NotificationType, NotificationMeta>;

const NOTIFICATION_ROUTES: Partial<Record<string, { pathname: string; param: string }>> = {
  "mail-account": { pathname: "/(dashboard)/(tabs)/profile/accounts", param: "id" },
  "daily-report": { pathname: "/(dashboard)/(tabs)/profile/report-detail", param: "reportId" },
  "backlog-run": { pathname: "/(dashboard)/(tabs)/profile/backlog", param: "runId" },
  "reply-draft": { pathname: "/(dashboard)/(tabs)/review/draft-detail", param: "draftId" },
  review: { pathname: "/(dashboard)/(tabs)/review", param: "from" },
};

export const notificationTarget = function (notification: {
  entityType?: string | null;
  entityId?: string | null;
}) {
  const route = notification.entityType && NOTIFICATION_ROUTES[notification.entityType];
  if (!route || !notification.entityId) return null;

  return { pathname: route.pathname as any, params: { [route.param]: notification.entityId } };
};
