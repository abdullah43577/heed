import { AppText } from "@/components/shared/app-text";
import { CATEGORY_META, EmailCategory } from "@/constants/categories";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { View } from "react-native";

interface Props {
  category: EmailCategory;
  count: number;
}

export const CategoryHeader = function ({ category, count }: Props) {
  const { categoryColor } = useThemeColors();

  return (
    <View className="mb-2 flex-row items-center gap-2">
      <View className="rounded-full" style={{ width: 8, height: 8, backgroundColor: categoryColor(category) }} />
      <AppText type="label" className="flex-1">
        {CATEGORY_META[category].label}
      </AppText>
      <AppText type="caption">{count}</AppText>
    </View>
  );
};
