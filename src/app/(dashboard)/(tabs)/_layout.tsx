import { useGetReviewMessages } from "@/hooks/messages/use-get-review-messages";
import { useSyncTimezone } from "@/hooks/profile/use-sync-timezone";
import { TAB_BAR_HEIGHT } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Tabs } from "expo-router";
import { CheckCheck, Inbox, Sparkles, User, type LucideIcon } from "lucide-react-native";
import { type ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabBarIconProps = {
  color: ColorValue;
  size: number;
  focused: boolean;
};

const TAB_ICONS = {
  review: Inbox,
  handled: CheckCheck,
  ask: Sparkles,
  profile: User,
} as const satisfies Record<string, LucideIcon>;

const makeTabIcon = function (key: keyof typeof TAB_ICONS) {
  const TabBarIcon = function ({ color, size, focused }: TabBarIconProps) {
    const Icon = TAB_ICONS[key];
    return <Icon size={size - 2} color={color as string} strokeWidth={focused ? 2 : 1.75} />;
  };

  TabBarIcon.displayName = `TabBarIcon(${key})`;
  return TabBarIcon;
};

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { accent, foregroundSubtle, surface, line } = useThemeColors();
  const { reviewMessages } = useGetReviewMessages();
  const waiting = reviewMessages.length;
  useSyncTimezone();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: foregroundSubtle,
        tabBarStyle: {
          backgroundColor: surface,
          borderTopColor: line,
          borderTopWidth: 1,
          height: TAB_BAR_HEIGHT + insets.bottom,
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
