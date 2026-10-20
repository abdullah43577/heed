import { AppText } from "@/components/shared/app-text";
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
    <View className="flex-row items-center gap-4 rounded-3xl border-hairline border-line bg-surface p-5">
      <View
        className="items-center justify-center rounded-full"
        style={{ width: 48, height: 48, backgroundColor: `${color}1F` }}
      >
        <AppText type="title" style={{ color }}>
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
    </View>
  );
};
