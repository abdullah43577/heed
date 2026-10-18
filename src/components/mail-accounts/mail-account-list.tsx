import { View } from "react-native";
import { MailAccount } from "../../../types/mail-account";
import { MailAccountRow } from "./mail-account-row";

interface Props {
  accounts: MailAccount[];
  onReconnect: (account: MailAccount) => void;
  onDisconnect: (account: MailAccount) => void;
  disabled: boolean;
}

export const MailAccountList = function ({ accounts, onReconnect, onDisconnect, disabled }: Props) {
  return (
    <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
      {accounts.map((account, index) => (
        <View key={account.id}>
          {index > 0 && <View className="ml-16 h-px bg-line" />}
          <MailAccountRow
            account={account}
            onReconnect={() => onReconnect(account)}
            onDisconnect={() => onDisconnect(account)}
            disabled={disabled}
          />
        </View>
      ))}
    </View>
  );
};
