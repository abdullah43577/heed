import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { BACKLOG_WINDOW_OPTIONS } from "@/constants/backlog";
import { View } from "react-native";
import { BacklogWindow } from "../../../types/backlog";

interface Props {
  windowDays: BacklogWindow;
  onWindowChange: (windowDays: BacklogWindow) => void;
  onStart: () => void;
  isStarting: boolean;
  disabled?: boolean;
  note?: string | null;
}

export const BacklogStartCard = function ({ windowDays, onWindowChange, onStart, isStarting, disabled = false, note }: Props) {
  return (
    <View className="rounded-xl border-hairline border-line bg-surface p-4">
      <AppText type="title">Tidy my backlog</AppText>
      <AppText type="subtitle" className="mt-1.5">
        Heed sorts the unread mail in your inbox, then shows you what it would mark as read. Nothing changes in
        Gmail until you confirm.
      </AppText>

      <AppText type="default" className="mb-2.5 mt-5 text-foreground-muted">
        Unread mail from the last
      </AppText>
      <SegmentedControl
        options={BACKLOG_WINDOW_OPTIONS}
        value={`${windowDays}`}
        onChange={(value) => onWindowChange(Number(value) as BacklogWindow)}
        disabled={disabled || isStarting}
      />

      <AppButton
        type="submit"
        label="Start"
        onPress={onStart}
        isLoading={isStarting}
        disabled={disabled}
        className="mt-5"
      />

      {note && (
        <AppText type="caption" className="mt-3 text-center">
          {note}
        </AppText>
      )}
    </View>
  );
};
