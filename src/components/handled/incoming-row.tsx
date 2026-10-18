import { AppText } from "@/components/shared/app-text";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
}

export const IncomingRow = function ({ message }: Props) {
  const color = accountColor(message.mailAccount.email);
  const sender = message.fromName ?? message.fromEmail;

  return (
    <View className="flex-row items-start gap-3 px-4 py-3.5">
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

        <AppText type="subtitle" numberOfLines={1} className="mt-0.5">
          {message.subject}
        </AppText>

        <AppText type="caption" numberOfLines={1} className="mt-1">
          {message.mailAccount.email}
        </AppText>
      </View>
    </View>
  );
};
