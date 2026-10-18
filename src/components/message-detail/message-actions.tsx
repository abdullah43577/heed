import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export interface MessageAction {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface Props {
  actions: MessageAction[];
  disabled: boolean;
}

export const MessageActions = function ({ actions, disabled }: Props) {
  const { foregroundMuted } = useThemeColors();

  return (
    <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
      {actions.map((action, index) => (
        <View key={action.key}>
          {index > 0 && <View className="ml-12 h-px bg-line" />}
          <Pressable
            onPress={action.onPress}
            disabled={disabled}
            className="flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-muted"
            style={{ opacity: disabled ? 0.5 : 1 }}
          >
            <Ionicons name={action.icon} size={18} color={foregroundMuted} />
            <AppText type="default" className="flex-1">
              {action.label}
            </AppText>
          </Pressable>
        </View>
      ))}
    </View>
  );
};
