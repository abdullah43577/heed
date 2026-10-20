import { AppText } from "@/components/shared/app-text";
import { format } from "date-fns";
import { View } from "react-native";
import { DailyReport } from "../../../types/report";

interface Props {
  report: DailyReport;
}

export const ReportTotals = function ({ report }: Props) {
  const { read, worthALook, awaitingReply, leftForYou } = report.totals;

  const details = [
    worthALook > 0 && `${worthALook} worth a look`,
    awaitingReply > 0 && `${awaitingReply} waiting on a reply`,
    leftForYou > 0 && `${leftForYou} left for you`,
  ].filter(Boolean);

  const period = `${format(new Date(report.periodStart), "EEE p")} to ${format(new Date(report.periodEnd), "EEE p")}`;

  return (
    <View className="rounded-3xl border-hairline border-line bg-surface p-5">
      <AppText type="display">{read}</AppText>
      <AppText type="subtitle" className="mt-0.5">
        {read === 1 ? "email read for you" : "emails read for you"}
      </AppText>

      {details.length > 0 && (
        <AppText type="caption" className="mt-3">
          {details.join(" · ")}
        </AppText>
      )}

      <AppText type="caption" className="mt-3 border-t-hairline border-line pt-3">
        {period}
      </AppText>
    </View>
  );
};
