import { Stack } from "expo-router";

export default function AskLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Ask" }} />
      <Stack.Screen name="message-detail" options={{ title: "Email" }} />
      <Stack.Screen name="draft-detail" options={{ title: "Reply" }} />
    </Stack>
  );
}
