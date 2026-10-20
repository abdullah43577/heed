import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { formatRelativeDate } from "@/utils/format-date";
import { View } from "react-native";
import { BacklogRun } from "../../../types/backlog";

interface Props {
  run: BacklogRun;
  onTidyAgain: () => void;
}

export const BacklogDoneCard = function ({ run, onTidyAgain }: Props) {
  const markedRead = run.markedRead ?? 0;

  return (
    <View className="rounded-3xl border-hairline border-line bg-surface p-5">
      <AppText type="display">{markedRead.toLocaleString()}</AppText>
      <AppText type="subtitle" className="mt-0.5">
        {markedRead === 1 ? "email marked as read in Gmail" : "emails marked as read in Gmail"}
      </AppText>

      {run.finishedAt && (
        <AppText type="caption" className="mt-3">
          Tidied {formatRelativeDate(run.finishedAt)}, from the last {run.windowDays} days
        </AppText>
      )}

      <AppButton type="secondary" label="Tidy again" onPress={onTidyAgain} className="mt-5" />
    </View>
  );
};
