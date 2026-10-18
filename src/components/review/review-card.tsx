import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { Pressable, View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
  onPress: () => void;
  onDismiss: () => void;
  disabled: boolean;
}

export const ReviewCard = function ({ message, onPress, onDismiss, disabled }: Props) {
  const color = accountColor(message.mailAccount.email);
  const sender = message.fromName ?? message.fromEmail;

  return (
    <Pressable onPress={onPress} className="rounded-3xl border-hairline border-line bg-surface p-5 active:opacity-70">
      <View className="flex-row items-center gap-3">
        <View
          className="items-center justify-center rounded-full"
          style={{ width: 36, height: 36, backgroundColor: `${color}1F` }}
        >
          <AppText type="label" style={{ color }}>
            {sender[0]?.toUpperCase()}
          </AppText>
        </View>

        <View className="flex-1">
          <AppText type="label" numberOfLines={1}>
            {sender}
          </AppText>
          <AppText type="caption" numberOfLines={1}>
            Waiting {formatRelativeDate(message.receivedAt).replace(/ ago$/, "")} · {message.mailAccount.email}
          </AppText>
        </View>
      </View>

      <AppText type="label" className="mt-4 text-[15px] leading-[20px]" numberOfLines={2}>
        {message.subject}
      </AppText>

      {message.summary && (
        <AppText type="subtitle" className="mt-1" numberOfLines={3}>
          {message.summary}
        </AppText>
      )}

      <AppButton
        type="secondary"
        label="No reply needed"
        onPress={onDismiss}
        disabled={disabled}
        className="mt-4 h-11"
      />
    </Pressable>
  );
};
