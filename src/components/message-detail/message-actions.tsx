import { AppText } from "@/components/shared/app-text";
import { SectionHeader } from "@/components/shared/section-header";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

export interface MessageAction {
  key: string;
  label: string;
  icon: LucideIcon;
  onPress: () => void;
}

interface Props {
  actions: MessageAction[];
  disabled: boolean;
}

export const MessageActions = function ({ actions, disabled }: Props) {
  const { foreground, foregroundSubtle } = useThemeColors();

  return (
    <View>
      <SectionHeader title="Actions" />
      <View className="overflow-hidden rounded-xl border-hairline border-line bg-surface">
        {actions.map(({ key, label, icon: Icon, onPress }, index) => (
          <View key={key}>
            {index > 0 && <View className="h-px bg-line" />}
            <Pressable
              onPress={onPress}
              disabled={disabled}
              className="flex-row items-center gap-3 px-3.5 py-3 active:bg-surface-muted"
              style={{ opacity: disabled ? 0.5 : 1 }}
            >
              <View className="h-8 w-8 items-center justify-center rounded-lg bg-surface-muted">
                <Icon size={18} color={foreground} strokeWidth={1.75} />
              </View>
              <AppText type="body" className="flex-1 font-inter-medium">
                {label}
              </AppText>
              <ChevronRight size={18} color={foregroundSubtle} strokeWidth={1.75} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};
