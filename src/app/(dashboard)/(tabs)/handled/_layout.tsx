import { Stack } from "expo-router";

export default function HandledLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Handled" }} />
      <Stack.Screen name="message-detail" options={{ title: "Email" }} />
      <Stack.Screen name="reports" options={{ title: "Past reports" }} />
      <Stack.Screen name="report-detail" options={{ title: "Report" }} />
    </Stack>
  );
}
