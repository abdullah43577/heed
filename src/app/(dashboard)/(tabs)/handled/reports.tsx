import { ReportList } from "@/components/reports/report-list";
import { EmptyState } from "@/components/shared/empty-state";
import { ScreenHeader } from "@/components/shared/screen-header";
import { DEFAULT_REPORT_TIME } from "@/constants/reports";
import { useGetReports } from "@/hooks/reports/use-get-reports";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatTimeOfDay } from "@/utils/format-date";
import { useRouter } from "expo-router";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DailyReport } from "../../../../../types/report";

export default function Reports() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { profile } = useGetProfile();
  const { reports, hasLoadedReports, isFetchingReports, refetchReports } = useGetReports();

  const reportTime = formatTimeOfDay(profile?.settings?.reportTime ?? DEFAULT_REPORT_TIME);

  const handlePressReport = function (report: DailyReport) {
    router.push({ pathname: "/(dashboard)/(tabs)/handled/report-detail", params: { reportId: report.id } });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScreenHeader title="Past reports" onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingReports && hasLoadedReports}
            onRefresh={() => refetchReports()}
            tintColor={accent}
          />
        }
      >
        {!hasLoadedReports ? (
          <View className="flex-1 items-center justify-center py-16">
            <ActivityIndicator color={accent} />
          </View>
        ) : reports.length === 0 ? (
          <EmptyState
            illustration="emptyHandled"
            title="No reports yet"
            subtitle={`Your first daily report arrives at ${reportTime}. You can change the time in Profile.`}
          />
        ) : (
          <ReportList reports={reports} onPressReport={handlePressReport} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
