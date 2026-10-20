import { View } from "react-native";
import { DailyReport } from "../../../types/report";
import { ReportRow } from "./report-row";

interface Props {
  reports: DailyReport[];
  onPressReport: (report: DailyReport) => void;
}

export const ReportList = function ({ reports, onPressReport }: Props) {
  return (
    <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
      {reports.map((report, index) => (
        <View key={report.id}>
          {index > 0 && <View className="ml-16 h-px bg-line" />}
          <ReportRow report={report} onPress={() => onPressReport(report)} />
        </View>
      ))}
    </View>
  );
};
