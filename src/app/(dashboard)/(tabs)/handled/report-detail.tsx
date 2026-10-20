import { MessageGroup } from "@/components/messages/message-group";
import { ReportAccountCounts } from "@/components/reports/report-account-counts";
import { ReportCategoryCounts } from "@/components/reports/report-category-counts";
import { ReportTotals } from "@/components/reports/report-totals";
import { AppText } from "@/components/shared/app-text";
import { ScreenHeader } from "@/components/shared/screen-header";
import { REPORT_CATEGORY_ORDER } from "@/constants/categories";
import { useGetReport } from "@/hooks/reports/use-get-report";
import { useSiblingRoute } from "@/hooks/use-sibling-route";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatReportDate } from "@/utils/format-date";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmailMessage } from "../../../../../types/email-message";

export default function ReportDetail() {
  const router = useRouter();
  const sibling = useSiblingRoute();
  const { accent } = useThemeColors();
  const { reportId } = useLocalSearchParams<{ reportId: string }>();

  const { report, isFetchingReport, refetchReport } = useGetReport({ reportId, shouldFetch: !!reportId });

  if (!report) {
    return (
      <SafeAreaView className="flex-1 bg-canvas">
        <ScreenHeader title="Report" onBack={() => router.back()} />
        <View className="flex-1 items-center justify-center">
          {isFetchingReport && <ActivityIndicator color={accent} />}
        </View>
      </SafeAreaView>
    );
  }

  const groups = REPORT_CATEGORY_ORDER.map((category) => ({
    category,
    messages: report.messages.filter((message) => message.category === category),
  })).filter((group) => group.messages.length > 0);

  const handlePressMessage = function (message: EmailMessage) {
    router.push({ pathname: sibling("message-detail"), params: { messageId: message.id } });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScreenHeader title={formatReportDate(report.reportDate)} onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-5 pb-10 pt-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isFetchingReport} onRefresh={() => refetchReport()} tintColor={accent} />
        }
      >
        <ReportTotals report={report} />
        <ReportCategoryCounts totals={report.totals} />
        {report.totals.byAccount.length > 1 && <ReportAccountCounts accounts={report.totals.byAccount} />}

        {groups.map((group) => (
          <MessageGroup
            key={group.category}
            category={group.category}
            messages={group.messages}
            onPressMessage={handlePressMessage}
          />
        ))}

        {report.totals.total > 0 && report.messages.length === 0 && (
          <AppText type="caption" className="text-center">
            Heed keeps the emails behind a report for 30 days. The counts stay.
          </AppText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
