import { AppText } from "@/components/shared/app-text";
import { InitialAvatar } from "@/components/shared/initial-avatar";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { X } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { MailAccount } from "../../../types/mail-account";

interface Props {
  account: MailAccount;
  onPress: () => void;
  onReconnect: () => void;
  onDisconnect: () => void;
  disabled: boolean;
}

export const MailAccountRow = function ({ account, onPress, onReconnect, onDisconnect, disabled }: Props) {
  const { foregroundSubtle } = useThemeColors();
  const color = accountColor(account.email);
  const needsReauth = account.status === "NEEDS_REAUTH";

  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 px-3.5 py-3 active:bg-surface-muted">
      <InitialAvatar label={account.email} color={color} />

      <View className="flex-1">
        <AppText type="body" numberOfLines={1} className="font-inter-medium">
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
        <X size={16} color={foregroundSubtle} strokeWidth={1.75} />
      </Pressable>
    </Pressable>
  );
};
