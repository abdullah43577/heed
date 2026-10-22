import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { ExternalLink } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { AskCitation } from "../../../types/ask";

interface Props {
  citation: AskCitation;
  showAccount: boolean;
  onPress: () => void;
}

export const AskSourceRow = function ({ citation, showAccount, onPress }: Props) {
  const { accent, accentMuted, foregroundSubtle } = useThemeColors();
  const sender = citation.fromName ?? citation.fromEmail;

  return (
    <Pressable onPress={onPress} className="flex-row items-start gap-3 px-3.5 py-3 active:bg-surface-muted">
      <View
        className="items-center justify-center rounded-squircle"
        style={{ width: 26, height: 26, backgroundColor: accentMuted }}
      >
        <AppText type="caption" className="font-inter-semibold" style={{ color: accent }}>
          {citation.n}
        </AppText>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <AppText type="body" numberOfLines={1} className="flex-1 font-inter-medium">
            {sender}
          </AppText>
          <AppText type="caption">{formatRelativeDate(citation.receivedAt)}</AppText>
        </View>
        <AppText type="subtitle" numberOfLines={1} className="mt-0.5">
          {citation.subject}
        </AppText>
        {showAccount && (
          <View className="mt-1 flex-row items-center gap-1.5">
            <View
              className="rounded-full"
              style={{ width: 6, height: 6, backgroundColor: accountColor(citation.accountEmail) }}
            />
            <AppText type="caption" numberOfLines={1}>
              {citation.accountEmail}
            </AppText>
          </View>
        )}
      </View>

      {!citation.emailMessageId && (
        <ExternalLink size={15} color={foregroundSubtle} strokeWidth={1.75} style={{ marginTop: 3 }} />
      )}
    </Pressable>
  );
};
