import { NotificationList } from "@/components/notifications/notification-list";
import { AppText } from "@/components/shared/app-text";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { ScreenHeader } from "@/components/shared/screen-header";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { notificationTarget } from "@/constants/notifications";
import { useGetNotifications } from "@/hooks/notifications/use-get-notifications";
import { useGetUnreadCount } from "@/hooks/notifications/use-get-unread-count";
import { useNotificationActions } from "@/hooks/notifications/use-notification-actions";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNotification } from "../../../../../types/notification";

type Filter = "all" | "unread";

export default function Notifications() {
  const router = useRouter();
  const { accent } = useThemeColors();

  const [filter, setFilter] = useState<Filter>("all");
  const [clearDialogVisible, setClearDialogVisible] = useState(false);

  const { notifications, isFetchingNotifications, refetchNotifications } =
    useGetNotifications(filter === "unread" ? { isRead: false } : undefined);

  const { unreadCount, refetchUnreadCount } = useGetUnreadCount();

  const {
    markRead,
    markAllRead,
    deleteNotification,
    clearAll,
    isMarkingAllRead,
  } = useNotificationActions();

  const handlePressNotification = function (notification: AppNotification) {
    if (!notification.isRead) markRead({ id: notification.id });

    const target = notificationTarget(notification);
    if (target) router.push(target);
  };

  const handleRefresh = function () {
    refetchNotifications();
    refetchUnreadCount();
  };

  const handleClearAll = function () {
    setClearDialogVisible(false);
    clearAll();
  };

  const isFirstLoad = isFetchingNotifications && notifications.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScreenHeader
        title="Notifications"
        onBack={() => router.back()}
        right={
          notifications.length > 0 && (
            <Pressable
              onPress={() => setClearDialogVisible(true)}
              hitSlop={8}
              className="active:opacity-70"
            >
              <AppText type="link">Clear all</AppText>
            </Pressable>
          )
        }
      />

      <View className="mt-4 px-5">
        <SegmentedControl
          options={[
            { label: "All", value: "all" },
            { label: "Unread", value: "unread" },
          ]}
          value={filter}
          onChange={(value) => setFilter(value as Filter)}
        />
      </View>

      {unreadCount > 0 && (
        <View className="mt-3 flex-row justify-end px-5">
          <Pressable
            onPress={() => markAllRead()}
            disabled={isMarkingAllRead}
            hitSlop={8}
            className="active:opacity-70"
          >
            <AppText type="link">Mark all as read</AppText>
          </Pressable>
        </View>
      )}

      <ScrollView
        className="mt-4 flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingNotifications && notifications.length > 0}
            onRefresh={handleRefresh}
            tintColor={accent}
          />
        }
      >
        {isFirstLoad ? (
          <View className="flex-1 items-center justify-center py-16">
            <ActivityIndicator color={accent} />
          </View>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon="notifications-off-outline"
            illustration="emptyNotifications"
            accentColor={accent}
            title={filter === "unread" ? "Nothing unread" : "No notifications yet"}
            subtitle={
              filter === "unread"
                ? "Every notification has been read"
                : "Daily reports and replies waiting for you will show up here"
            }
          />
        ) : (
          <NotificationList
            notifications={notifications}
            onPressNotification={handlePressNotification}
            onDeleteNotification={(id) => deleteNotification({ id })}
          />
        )}
      </ScrollView>

      <ConfirmDialog
        visible={clearDialogVisible}
        title="Clear notifications"
        message="This removes every notification from your list. It cannot be undone."
        confirmLabel="Clear all"
        variant="delete"
        onConfirm={handleClearAll}
        onCancel={() => setClearDialogVisible(false)}
      />
    </SafeAreaView>
  );
}
