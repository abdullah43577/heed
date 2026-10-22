import { ReportScheduleCard } from "@/components/report-settings/report-schedule-card";
import { AppText } from "@/components/shared/app-text";
import { BottomSheetPicker } from "@/components/shared/bottom-sheet-picker";
import { ScreenHeader } from "@/components/shared/screen-header";
import { DEFAULT_REPORT_TIME, REPORT_TIME_OPTIONS } from "@/constants/reports";
import { useUpdateSettings } from "@/hooks/profile/use-update-settings";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { deviceTimeZone } from "@/utils/format-date";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportSettings() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const [pickerVisible, setPickerVisible] = useState(false);

  const { profile } = useGetProfile();
  const { updateSettings, isUpdatingSettings } = useUpdateSettings();

  const reportTime = profile?.settings?.reportTime ?? DEFAULT_REPORT_TIME;
  const pushEnabled = profile?.settings?.notifications ?? true;

  const handleSelectTime = function (value: string) {
    setPickerVisible(false);
    if (value !== reportTime) updateSettings({ reportTime: value, timezone: deviceTimeZone() });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScreenHeader title="Daily report" onBack={() => router.back()} />

      {!profile ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={accent} />
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-8 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <AppText type="subtitle">
            Once a day, Heed tells you what it read for you: how many, from which account, anything worth a
            look first, and what it left for you.
          </AppText>

          <View className="mt-6">
            <ReportScheduleCard
              reportTime={reportTime}
              timezone={deviceTimeZone()}
              onPressTime={() => setPickerVisible(true)}
              disabled={isUpdatingSettings}
            />
          </View>

          <AppText type="caption" className="mt-3 px-1">
            {pushEnabled
              ? "No push on a day nothing came in. Past reports are in Handled."
              : "Push notifications are off, so reports wait for you in Handled."}
          </AppText>
        </ScrollView>
      )}

      <BottomSheetPicker
        visible={pickerVisible}
        title="Send the report at"
        selectedValue={reportTime}
        options={REPORT_TIME_OPTIONS}
        onSelect={handleSelectTime}
        onClose={() => setPickerVisible(false)}
        showSearch={false}
      />
    </SafeAreaView>
  );
}
