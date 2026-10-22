import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatReportDate } from "@/utils/format-date";
import { IconTile } from "@/components/shared/icon-tile";
import { ChevronRight, FileText } from "lucide-react-native";
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
    <Pressable onPress={onPress} className="flex-row items-center gap-3 px-3.5 py-3 active:bg-surface-muted">
      <IconTile icon={FileText} color={color} background={holder} />

      <View className="flex-1">
        <AppText type="body" numberOfLines={1} className="font-inter-medium">
          {formatReportDate(report.reportDate)}
        </AppText>
        <AppText type="subtitle" numberOfLines={2} className="mt-0.5">
          {report.headline}
        </AppText>
      </View>

      <ChevronRight size={18} color={foregroundSubtle} strokeWidth={1.75} />
    </Pressable>
  );
};
