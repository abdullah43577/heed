import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="accounts" options={{ title: "Gmail accounts" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="report-settings" options={{ title: "Daily report" }} />
      <Stack.Screen name="report-detail" options={{ title: "Report" }} />
      <Stack.Screen name="message-detail" options={{ title: "Email" }} />
    </Stack>
  );
}
