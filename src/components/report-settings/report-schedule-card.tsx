import { SettingsCard } from "@/components/profile/settings-card";
import { SettingsRow } from "@/components/profile/settings-row";
import { formatTimeOfDay } from "@/utils/format-date";

interface Props {
  reportTime: string;
  timezone: string;
  onPressTime: () => void;
  disabled?: boolean;
}

export const ReportScheduleCard = function ({ reportTime, timezone, onPressTime, disabled = false }: Props) {
  return (
    <SettingsCard title="Schedule">
      <SettingsRow
        label="Send it at"
        withDivider
        value={formatTimeOfDay(reportTime)}
        {...(!disabled && { onPress: onPressTime })}
      />
      <SettingsRow label="Timezone" withDivider value={timezone.replaceAll("_", " ")} />
    </SettingsCard>
  );
};
