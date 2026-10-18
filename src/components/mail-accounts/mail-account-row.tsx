import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { MailAccount } from "../../../types/mail-account";

interface Props {
  account: MailAccount;
  onReconnect: () => void;
  onDisconnect: () => void;
  disabled: boolean;
}

export const MailAccountRow = function ({ account, onReconnect, onDisconnect, disabled }: Props) {
  const { foregroundSubtle } = useThemeColors();
  const color = accountColor(account.email);
  const needsReauth = account.status === "NEEDS_REAUTH";

  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <View
        className="items-center justify-center rounded-full"
        style={{ width: 38, height: 38, backgroundColor: `${color}1F` }}
      >
        <AppText type="label" style={{ color }}>
          {account.email[0]?.toUpperCase()}
        </AppText>
      </View>

      <View className="flex-1">
        <AppText type="label" numberOfLines={1}>
          {account.email}
        </AppText>

        {needsReauth ? (
          <AppText type="caption" className="mt-0.5 text-danger">
            Heed lost access to this account
          </AppText>
        ) : (
          <AppText type="caption" className="mt-0.5">
            Connected {formatRelativeDate(account.connectedAt)}
          </AppText>
        )}
      </View>

      {needsReauth && (
        <Pressable onPress={onReconnect} disabled={disabled} hitSlop={8} className="active:opacity-70">
          <AppText type="link">Reconnect</AppText>
        </Pressable>
      )}

      <Pressable
        onPress={onDisconnect}
        disabled={disabled}
        hitSlop={10}
        className="h-8 w-8 items-center justify-center rounded-full active:bg-surface-muted"
      >
        <Ionicons name="close" size={15} color={foregroundSubtle} />
      </Pressable>
    </View>
  );
};
