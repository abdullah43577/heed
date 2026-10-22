import { useThemeColors } from "@/hooks/use-theme-colors";
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "./app-text";

interface Props {
  icon?: LucideIcon;
  label: string;
}

export const Eyebrow = function ({ icon: Icon, label }: Props) {
  const { accent } = useThemeColors();

  return (
    <View className="flex-row items-center gap-1.5">
      {Icon && <Icon size={13} color={accent} strokeWidth={2} />}
      <AppText type="caption" className="font-inter-semibold uppercase tracking-[0.6px] text-accent">
        {label}
      </AppText>
    </View>
  );
};
