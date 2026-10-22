import { AppText } from "@/components/shared/app-text";
import { InitialAvatar } from "@/components/shared/initial-avatar";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { View } from "react-native";
import { MailAccount } from "../../../types/mail-account";

interface Props {
  account: MailAccount;
}

export const AccountHeaderCard = function ({ account }: Props) {
  const color = accountColor(account.email);
  const needsReauth = account.status === "NEEDS_REAUTH";

  return (
    <View className="flex-row items-center gap-3 rounded-xl border-hairline border-line bg-surface p-4">
      <InitialAvatar label={account.email} color={color} size={44} />

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
    </View>
  );
};
