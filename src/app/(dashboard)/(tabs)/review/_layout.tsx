import { Stack } from "expo-router";

export default function ReviewLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Review" }} />
      <Stack.Screen name="message-detail" options={{ title: "Email" }} />
    </Stack>
  );
}
