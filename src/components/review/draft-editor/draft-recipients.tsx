import { AppText } from "@/components/shared/app-text";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { View } from "react-native";
import { Recipient, Recipients } from "../../../../types/draft";

interface Props {
  recipients: { reply: Recipients; replyAll: Recipients } | null;
  replyAll: boolean;
  onChange: (replyAll: boolean) => void;
  disabled: boolean;
}

const names = (list: Recipient[]) => list.map((entry) => entry.name || entry.address).join(", ");

// Who it goes to is worked out from the email's headers on the server, never by the AI.
export const DraftRecipients = function ({ recipients, replyAll, onChange, disabled }: Props) {
  if (!recipients) return null;

  const current = replyAll ? recipients.replyAll : recipients.reply;
  const canReplyAll = recipients.replyAll.cc.length > 0;

  return (
    <View className="gap-3">
      {canReplyAll && (
        <SegmentedControl
          options={[
            { label: "Reply", value: "reply" },
            { label: "Reply all", value: "all" },
          ]}
          value={replyAll ? "all" : "reply"}
          onChange={(value) => onChange(value === "all")}
          disabled={disabled}
        />
      )}

      <View className="gap-1 px-1">
        <AppText type="caption" numberOfLines={2}>
          To: {names(current.to)}
        </AppText>
        {current.cc.length > 0 && (
          <AppText type="caption" numberOfLines={2}>
            Cc: {names(current.cc)}
          </AppText>
        )}
      </View>
    </View>
  );
};
