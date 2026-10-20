import { AppText } from "@/components/shared/app-text";
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
  const color = accountColor(message.mailAccount.email);
  const sender = message.fromName ?? message.fromEmail;
  const note = actionNote(message);

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} delayLongPress={350} className="flex-row items-start gap-3 px-4 py-3.5 active:bg-surface-muted">
      <View
        className="items-center justify-center rounded-full"
        style={{ width: 38, height: 38, backgroundColor: `${color}1F` }}
      >
        <AppText type="label" style={{ color }}>
          {sender[0]?.toUpperCase()}
        </AppText>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <AppText type="label" numberOfLines={1} className="flex-1">
            {sender}
          </AppText>
          <AppText type="caption">{formatRelativeDate(message.receivedAt)}</AppText>
        </View>

        <AppText type="subtitle" numberOfLines={2} className="mt-0.5">
          {message.summary ?? message.subject}
        </AppText>

        {note && (
          <AppText type="caption" className="mt-1">
            {note}
          </AppText>
        )}
      </View>
    </Pressable>
  );
};
