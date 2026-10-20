import { AppText } from "@/components/shared/app-text";
import { SectionHeader } from "@/components/shared/section-header";
import { CATEGORY_META, EmailCategory, REPORT_CATEGORY_ORDER } from "@/constants/categories";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface Props {
  byCategory: Record<EmailCategory, number>;
  title?: string;
}

export const CategoryCounts = function ({ byCategory, title = "By category" }: Props) {
  const { categoryTint } = useThemeColors();
  const rows = REPORT_CATEGORY_ORDER.filter((category) => byCategory[category] > 0);

  if (rows.length === 0) return null;

  return (
    <View>
      <SectionHeader title={title} />

      <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
        {rows.map((category, index) => {
          const { color, holder } = categoryTint(category);
          const meta = CATEGORY_META[category];

          return (
            <View key={category}>
              {index > 0 && <View className="ml-14 h-px bg-line" />}
              <View className="flex-row items-center gap-3 px-4 py-3">
                <View
                  className="items-center justify-center rounded-squircle"
                  style={{ width: 26, height: 26, backgroundColor: holder }}
                >
                  <Ionicons name={meta.icon} size={14} color={color} />
                </View>
                <AppText type="default" className="flex-1">
                  {meta.label}
                </AppText>
                <AppText type="label">{byCategory[category]}</AppText>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
