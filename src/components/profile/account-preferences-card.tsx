import { useGetProfile } from "@/hooks/use-get-profile";
import { ThemePreference } from "@/constants/theme";
import { Bell, BellRing } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "../shared/app-text";
import { Badge } from "../shared/badge";
import { SegmentedControl } from "../shared/segmented-control";
import { ToggleSwitch } from "../shared/toggle-switch";
import { SettingsCard } from "./settings-card";
import { SettingsRow } from "./settings-row";

interface Props {
  theme: ThemePreference;
  onThemeChange: (str: ThemePreference) => void;
  isUpdatingSettings: boolean;
  onNotificationsToggle: (arg: boolean) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
}

export const AccountPreferencesCard = function ({
  theme,
  onThemeChange,
  isUpdatingSettings,
  onNotificationsToggle,
  unreadCount,
  onOpenNotifications,
}: Props) {
  const { profile } = useGetProfile();

  return (
    <SettingsCard title="Preferences">
      <View className="border-t-hairline border-line p-3.5">
        <AppText type="body" className="mb-2.5 font-inter-medium">
          Appearance
        </AppText>
        <SegmentedControl
          options={[
            { label: "System", value: "SYSTEM" },
            { label: "Light", value: "LIGHT" },
            { label: "Dark", value: "DARK" },
          ]}
          value={theme}
          onChange={onThemeChange}
        />
      </View>

      <SettingsRow
        label="Push notifications"
        icon={BellRing}
        withDivider
        right={
          <ToggleSwitch
            value={profile?.settings?.notifications ?? true}
            onValueChange={onNotificationsToggle}
            disabled={isUpdatingSettings}
          />
        }
      />

      <SettingsRow
        label="Notifications"
        icon={Bell}
        withDivider
        onPress={onOpenNotifications}
        right={
          unreadCount > 0 ? (
            <Badge label={unreadCount > 99 ? "99+" : `${unreadCount}`} variant="secondary" />
          ) : undefined
        }
      />
    </SettingsCard>
  );
};
