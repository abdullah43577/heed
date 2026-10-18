import { useEffect, useRef, useState } from "react";
import type { EventSubscription, Notification } from "expo-notifications";
import { AppState } from "react-native";
import { Notifications } from "@/provider/notifications";
import { useAuthStore } from "@/store/auth";
import { registerForPushNotificationsAsync } from "@/provider/register-for-push-notification";
import { notificationTarget } from "@/constants/notifications";
import { router } from "expo-router";

export default function useNotifications() {
  const { expoPushToken, setExpoPushToken } = useAuthStore();
  const [expoPushTokenError, setExpoPushTokenError] = useState("");
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined,
  );
  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);
  const appStateRef = useRef(AppState.currentState);

  Notifications?.setNotificationHandler({
    handleNotification: async () => {
      const isAppActive = appStateRef.current === "active";

      return {
        shouldShowAlert: isAppActive,
        shouldPlaySound: isAppActive,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      };
    },
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appStateRef.current = nextAppState;

      const notifications = Notifications;
      if (nextAppState === "active" && notifications) {
        notifications.getAllScheduledNotificationsAsync().then((notifs) => {
          if (notifs.length) notifications.dismissAllNotificationsAsync();
        });
      }
    });

    return () => subscription.remove();
  }, []);

  const handleRegisterForPushNotification = async function (
    promptIfNeeded = false,
  ) {
    try {
      const token = await registerForPushNotificationsAsync({ promptIfNeeded });
      setExpoPushToken(token ?? "");
      return !!token;
    } catch (error) {
      setExpoPushTokenError(`${error}`);
      return false;
    }
  };

  useEffect(() => {
    // Never prompts here; the ask belongs to the setup flow.
    handleRegisterForPushNotification();

    if (!Notifications) return;

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(
          "🛎️ Notification Received while the app is running: ",
          notification,
        );
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data as {
          entityType?: string;
          entityId?: string;
        };

        const target = data && notificationTarget(data);
        if (target) router.push(target);
      });

    return () => {
      (notificationListener.current && notificationListener.current.remove(),
        responseListener.current && responseListener.current.remove());
    };
  }, []);

  return {
    expoPushToken,
    expoPushTokenError,
    notification,
    handleRegisterForPushNotification,
  };
}
