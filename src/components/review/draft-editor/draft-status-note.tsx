import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";
import { ReplyDraft } from "../../../../types/draft";

interface Props {
  draft: ReplyDraft;
  accountNeedsReconnect: boolean;
}

const CLOSED_NOTES: Partial<Record<ReplyDraft["status"], string>> = {
  SENT: "Sent. It's in this conversation in Gmail.",
  DISMISSED: "You marked this as needing no reply.",
  REPLIED_ELSEWHERE: "You replied in Gmail, so Heed set this draft aside.",
};

export const DraftStatusNote = function ({ draft, accountNeedsReconnect }: Props) {
  const note = accountNeedsReconnect
    ? "Heed lost access to this Gmail account. Reconnect it in Profile to send."
    : draft.status === "FAILED"
      ? (draft.failureReason ?? "This reply wasn't sent. Try again.")
      : CLOSED_NOTES[draft.status];

  if (!note) return null;

  return (
    <View className="rounded-2xl border-hairline border-line bg-surface-muted px-4 py-3">
      <AppText type="subtitle">{note}</AppText>
    </View>
  );
};
