import { useGetReviewMessages } from "@/hooks/messages/use-get-review-messages";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, type ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabBarIconProps = {
  color: ColorValue;
  size: number;
  focused: boolean;
};

const TAB_ICONS = {
  review: { active: "create", inactive: "create-outline" },
  handled: { active: "checkmark-done-circle", inactive: "checkmark-done-circle-outline" },
  ask: { active: "sparkles", inactive: "sparkles-outline" },
  profile: { active: "person", inactive: "person-outline" },
} as const satisfies Record<
  string,
  {
    active: keyof typeof Ionicons.glyphMap;
    inactive: keyof typeof Ionicons.glyphMap;
  }
>;

const makeTabIcon = function (key: keyof typeof TAB_ICONS) {
  const TabBarIcon = function ({ color, size, focused }: TabBarIconProps) {
    return (
      <Ionicons
        name={focused ? TAB_ICONS[key].active : TAB_ICONS[key].inactive}
        size={size}
        color={color}
      />
    );
  };

  TabBarIcon.displayName = `TabBarIcon(${key})`;
  return TabBarIcon;
};

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { accent, foregroundSubtle, surface, line } = useThemeColors();
  const { reviewMessages } = useGetReviewMessages();
  const waiting = reviewMessages.length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: foregroundSubtle,
        tabBarStyle: {
          backgroundColor: surface,
          borderTopColor: line,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontFamily: "Inter-Medium" },
      }}
    >
      <Tabs.Screen
        name="review"
        options={{
          title: "Review",
          tabBarIcon: makeTabIcon("review"),
          ...(waiting > 0 && { tabBarBadge: waiting > 99 ? "99+" : waiting }),
          tabBarBadgeStyle: { backgroundColor: accent, color: "#FFFFFF", fontSize: 10 },
        }}
      />
      <Tabs.Screen
        name="handled"
        options={{ title: "Handled", tabBarIcon: makeTabIcon("handled") }}
      />
      <Tabs.Screen
        name="ask"
        options={{ title: "Ask", tabBarIcon: makeTabIcon("ask") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: makeTabIcon("profile") }}
      />
    </Tabs>
  );
}
