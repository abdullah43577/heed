import { View } from "react-native";
import { MailAccount } from "../../../types/mail-account";
import { MailAccountRow } from "./mail-account-row";

interface Props {
  accounts: MailAccount[];
  onPress: (account: MailAccount) => void;
  onReconnect: (account: MailAccount) => void;
  onDisconnect: (account: MailAccount) => void;
  disabled: boolean;
}

export const MailAccountList = function ({ accounts, onPress, onReconnect, onDisconnect, disabled }: Props) {
  return (
    <View className="overflow-hidden rounded-xl border-hairline border-line bg-surface">
      {accounts.map((account, index) => (
        <View key={account.id}>
          {index > 0 && <View className="ml-[62px] h-px bg-line" />}
          <MailAccountRow
            account={account}
            onPress={() => onPress(account)}
            onReconnect={() => onReconnect(account)}
            onDisconnect={() => onDisconnect(account)}
            disabled={disabled}
          />
        </View>
      ))}
    </View>
  );
};
