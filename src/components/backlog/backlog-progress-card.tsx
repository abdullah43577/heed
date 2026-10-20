import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";
import { BacklogRun } from "../../../types/backlog";

interface Props {
  run: BacklogRun;
  toMarkRead?: number;
}

const formatCount = (count: number) => count.toLocaleString();

export const BacklogProgressCard = function ({ run, toMarkRead = 0 }: Props) {
  const headline =
    run.status === "SCANNING"
      ? `Found ${formatCount(run.total)} unread ${run.total === 1 ? "email" : "emails"} so far`
      : run.status === "APPLYING"
        ? `Marking ${formatCount(toMarkRead)} as read…`
        : `Sorted ${formatCount(run.sorted)} of ${formatCount(run.total)}`;

  const progress = run.status === "SORTING" && run.total > 0 ? Math.min(1, run.sorted / run.total) : null;

  return (
    <View className="rounded-3xl border-hairline border-line bg-surface p-5">
      <AppText type="title">{headline}</AppText>

      <View className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <View
          className="h-full rounded-full bg-accent"
          style={{ width: progress === null ? "12%" : `${Math.max(4, progress * 100)}%` }}
        />
      </View>

      <AppText type="caption" className="mt-3">
        {run.status === "APPLYING"
          ? "This only takes a moment."
          : "You can leave this screen. Heed will let you know when it's ready. Nothing in Gmail changes until you confirm."}
      </AppText>
    </View>
  );
};
