import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { formatRelativeDate } from "@/utils/format-date";
import { View } from "react-native";
import { BacklogRun } from "../../../types/backlog";

interface Props {
  run: BacklogRun;
  onTidyAgain: () => void;
}

const nothingToTidy = function (run: BacklogRun) {
  if (run.total === 0) {
    return {
      title: "Nothing to tidy",
      message: `No unread mail from the last ${run.windowDays} days that Heed hadn't already sorted.`,
    };
  }

  const found = run.total === 1 ? "the 1 unread email" : `the ${run.total.toLocaleString()} unread emails`;
  return {
    title: "Nothing to mark as read",
    message: `None of ${found} from the last ${run.windowDays} days could be marked as read without you. Any Heed set aside are below.`,
  };
};

export const BacklogDoneCard = function ({ run, onTidyAgain }: Props) {
  const markedRead = run.markedRead ?? 0;
  const empty = markedRead === 0 ? nothingToTidy(run) : null;

  return (
    <View className="rounded-xl border-hairline border-line bg-surface p-4">
      {empty ? (
        <>
          <AppText type="title">{empty.title}</AppText>
          <AppText type="subtitle" className="mt-1">
            {empty.message}
          </AppText>
        </>
      ) : (
        <>
          <AppText type="display">{markedRead.toLocaleString()}</AppText>
          <AppText type="subtitle" className="mt-0.5">
            {markedRead === 1 ? "email marked as read in Gmail" : "emails marked as read in Gmail"}
          </AppText>
        </>
      )}

      {run.finishedAt && (
        <AppText type="caption" className="mt-3">
          {empty ? "Checked" : "Tidied"} {formatRelativeDate(run.finishedAt)}
          {empty ? "" : `, from the last ${run.windowDays} days`}
        </AppText>
      )}

      <AppButton type="secondary" label="Tidy again" onPress={onTidyAgain} className="mt-5" />
    </View>
  );
};
