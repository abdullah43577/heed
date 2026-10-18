import Constants, { ExecutionEnvironment } from "expo-constants";
import { Platform } from "react-native";

type NotificationsModule = typeof import("expo-notifications");

// Expo Go on Android throws when expo-notifications is merely imported (removed in
// SDK 53), so it is resolved here and every caller degrades when it is null.
const loadNotifications = function (): NotificationsModule | null {
  const isExpoGoAndroid =
    Platform.OS === "android" &&
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  if (isExpoGoAndroid) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("expo-notifications");
  } catch {
    return null;
  }
};

export const Notifications = loadNotifications();
