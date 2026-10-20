import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { BACKLOG_MAX_MESSAGES } from "@/constants/backlog";
import { View } from "react-native";
import { BacklogCounts } from "../../../types/backlog";

interface Props {
  summary: BacklogCounts;
  truncated: boolean;
  onApply: () => void;
  isApplying: boolean;
  disabled?: boolean;
}

const formatCount = (count: number) => count.toLocaleString();

export const BacklogSummaryCard = function ({ summary, truncated, onApply, isApplying, disabled = false }: Props) {
  const notes = [
    summary.keptAsIs > 0 &&
      `${formatCount(summary.keptAsIs)} left as they were: you'd already read them, or asked Heed to leave the sender.`,
    truncated && `Heed stopped at ${formatCount(BACKLOG_MAX_MESSAGES)} emails. Run it again afterwards for the rest.`,
  ].filter(Boolean);

  return (
    <View className="rounded-3xl border-hairline border-line bg-surface p-5">
      <AppText type="display">{formatCount(summary.toMarkRead)}</AppText>
      <AppText type="subtitle" className="mt-0.5">
        {summary.toMarkRead === 1 ? "email ready to mark as read" : "emails ready to mark as read"}
      </AppText>

      {summary.toMarkRead > 0 && (
        <AppButton
          type="submit"
          label={`Mark ${formatCount(summary.toMarkRead)} as read`}
          onPress={onApply}
          isLoading={isApplying}
          disabled={disabled}
          className="mt-5"
        />
      )}

      <AppText type="caption" className="mt-3">
        They stay in your inbox, labelled Heed/Handled. Anything that might need you stays unread.
      </AppText>

      {notes.map((note) => (
        <AppText key={note as string} type="caption" className="mt-2">
          {note}
        </AppText>
      ))}
    </View>
  );
};
