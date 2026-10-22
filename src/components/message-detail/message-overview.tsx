import { AppText } from "@/components/shared/app-text";
import { InitialAvatar } from "@/components/shared/initial-avatar";
import { CATEGORY_META } from "@/constants/categories";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
}

export const MessageOverview = function ({ message }: Props) {
  const { categoryTint } = useThemeColors();
  const category = message.category ?? "UNSURE";
  const { color, holder } = categoryTint(category);
  const sender = message.fromName ?? message.fromEmail;

  return (
    <View className="gap-3">
      <View className="self-start rounded-full px-2.5 py-1" style={{ backgroundColor: holder }}>
        <AppText type="caption" className="font-inter-medium" style={{ color }}>
          {CATEGORY_META[category].label}
        </AppText>
      </View>

      <AppText type="title" className="text-[18px] leading-[24px]">
        {message.subject}
      </AppText>

      <View className="flex-row items-center gap-2.5">
        <InitialAvatar label={sender} color={accountColor(message.mailAccount.email)} />
        <View className="flex-1">
          <View className="flex-row items-baseline gap-2">
            <AppText type="label" numberOfLines={1} className="flex-1">
              {sender}
            </AppText>
            <AppText type="caption">{formatRelativeDate(message.receivedAt)}</AppText>
          </View>
          <AppText type="subtitle" numberOfLines={1}>
            {message.fromName ? `${message.fromEmail} · ` : ""}to {message.mailAccount.email}
          </AppText>
        </View>
      </View>
    </View>
  );
};
