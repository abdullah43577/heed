import { AppText } from "@/components/shared/app-text";
import { CATEGORY_META, EmailCategory } from "@/constants/categories";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface Props {
  category: EmailCategory;
  count: number;
}

export const CategoryHeader = function ({ category, count }: Props) {
  const { categoryTint } = useThemeColors();
  const { color, holder } = categoryTint(category);
  const meta = CATEGORY_META[category];

  return (
    <View className="mb-3 flex-row items-center gap-2.5">
      <View
        className="items-center justify-center rounded-squircle"
        style={{ width: 26, height: 26, backgroundColor: holder }}
      >
        <Ionicons name={meta.icon} size={14} color={color} />
      </View>

      <AppText type="label" className="flex-1 text-[15px] leading-[20px]">
        {meta.label}
      </AppText>

      <AppText type="caption">{count}</AppText>
    </View>
  );
};
