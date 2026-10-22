import { EmailCategory } from "@/constants/categories";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "./app-text";

interface Props {
  icon: LucideIcon;
  tint: EmailCategory;
  value: number;
  label: string;
}

export const StatTile = function ({ icon: Icon, tint, value, label }: Props) {
  const { categoryTint } = useThemeColors();
  const { color, holder } = categoryTint(tint);

  return (
    <View className="flex-1 items-center rounded-xl border-hairline border-line bg-surface px-2 py-3">
      <View className="mb-2 items-center justify-center rounded-full" style={{ width: 36, height: 36, backgroundColor: holder }}>
        <Icon size={18} color={color} strokeWidth={1.75} />
      </View>
      <AppText type="label" className="text-[16px] leading-[22px]">
        {value.toLocaleString()}
      </AppText>
      <AppText type="caption" numberOfLines={1} className="mt-0.5 text-center">
        {label}
      </AppText>
    </View>
  );
};
