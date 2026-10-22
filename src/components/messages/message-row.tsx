import { AppText } from "@/components/shared/app-text";
import { InitialAvatar } from "@/components/shared/initial-avatar";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { Pressable, View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
  onPress: () => void;
  onLongPress?: () => void;
}

const actionNote = function (message: EmailMessage) {
  if (message.action === "UNDONE") return "Marked unread again";
  if (message.action === "REPLIED") return message.reason ?? "You replied";
  if (message.action === "LEFT_UNREAD" && message.category !== "UNSURE") return "Left unread";
  return null;
};

export const MessageRow = function ({ message, onPress, onLongPress }: Props) {
  const sender = message.fromName ?? message.fromEmail;
  const note = actionNote(message);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={350}
      className="flex-row items-center gap-3 px-3.5 py-3 active:bg-surface-muted"
    >
      <InitialAvatar label={sender} color={accountColor(message.mailAccount.email)} />

      <View className="flex-1">
        <View className="flex-row items-baseline gap-2">
          <AppText type="body" numberOfLines={1} className="flex-1 font-inter-medium">
            {sender}
          </AppText>
          <AppText type="caption">{formatRelativeDate(message.receivedAt)}</AppText>
        </View>

        <AppText type="subtitle" numberOfLines={1}>
          {message.summary ?? message.subject}
        </AppText>

        {note && (
          <AppText type="caption" className="mt-0.5">
            {note}
          </AppText>
        )}
      </View>
    </Pressable>
  );
};
