import { AppText } from "@/components/shared/app-text";
import { CATEGORY_META } from "@/constants/categories";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatRelativeDate } from "@/utils/format-date";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
}

export const MessageOverview = function ({ message }: Props) {
  const { categoryTint } = useThemeColors();
  const category = message.category ?? "UNSURE";
  const { color, holder } = categoryTint(category);
  const meta = CATEGORY_META[category];

  return (
    <View className="rounded-3xl border-hairline border-line bg-surface p-5">
      <View className="flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1" style={{ backgroundColor: holder }}>
        <Ionicons name={meta.icon} size={12} color={color} />
        <AppText type="caption" style={{ color }} className="font-inter-semibold">
          {meta.label}
        </AppText>
      </View>

      <AppText type="title" className="mt-4 text-[20px] leading-[26px]">
        {message.subject}
      </AppText>

      <AppText type="label" className="mt-3" numberOfLines={1}>
        {message.fromName ?? message.fromEmail}
      </AppText>
      {message.fromName && (
        <AppText type="caption" className="mt-0.5" numberOfLines={1}>
          {message.fromEmail}
        </AppText>
      )}

      <AppText type="caption" className="mt-3" numberOfLines={1}>
        To {message.mailAccount.email} · {formatRelativeDate(message.receivedAt)}
      </AppText>
    </View>
  );
};
