import { ReportScheduleCard } from "@/components/report-settings/report-schedule-card";
import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";
import { SetupStepIntro } from "./setup-step-intro";

interface Props {
  reportTime: string;
  timezone: string;
  onPressTime: () => void;
  disabled: boolean;
}

export const ReportStep = function ({ reportTime, timezone, onPressTime, disabled }: Props) {
  return (
    <View>
      <SetupStepIntro
        illustration="setupReport"
        title="Pick a time for your report"
        subtitle="Once a day, Heed tells you what it read for you: how many emails, a line on each, and anything worth a look first."
      />

      <View className="mt-6">
        <ReportScheduleCard
          reportTime={reportTime}
          timezone={timezone}
          onPressTime={onPressTime}
          disabled={disabled}
        />
      </View>

      <AppText type="caption" className="mt-3 px-1">
        You can change it any time in Profile → Daily report.
      </AppText>
    </View>
  );
};
