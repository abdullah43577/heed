import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatReportDate } from "@/utils/format-date";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { DailyReport } from "../../../types/report";

interface Props {
  report: DailyReport;
  onPress: () => void;
}

export const ReportRow = function ({ report, onPress }: Props) {
  const { categoryTint, foregroundSubtle } = useThemeColors();
  const { color, holder } = categoryTint(report.totals.worthALook > 0 ? "IMPORTANT" : "NEEDS_REPLY");

  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-muted">
      <View
        className="items-center justify-center rounded-squircle"
        style={{ width: 38, height: 38, backgroundColor: holder }}
      >
        <Ionicons name="newspaper-outline" size={18} color={color} />
      </View>

      <View className="flex-1">
        <AppText type="label" numberOfLines={1}>
          {formatReportDate(report.reportDate)}
        </AppText>
        <AppText type="subtitle" numberOfLines={2} className="mt-0.5">
          {report.headline}
        </AppText>
      </View>

      <Ionicons name="chevron-forward" size={16} color={foregroundSubtle} />
    </Pressable>
  );
};
