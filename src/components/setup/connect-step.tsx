import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { InitialAvatar } from "@/components/shared/initial-avatar";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { accountColor } from "@/utils/account-color";
import { CircleCheck } from "lucide-react-native";
import { View } from "react-native";
import { MailAccount } from "../../../types/mail-account";
import { SetupStepIntro } from "./setup-step-intro";

interface Props {
  mailAccounts: MailAccount[];
  onConnect: () => void;
  isConnecting: boolean;
}

export const ConnectStep = function ({ mailAccounts, onConnect, isConnecting }: Props) {
  const { accent } = useThemeColors();
  const hasAccount = mailAccounts.length > 0;

  return (
    <View>
      <SetupStepIntro
        illustration="emptyAccounts"
        title="Connect your Gmail"
        subtitle="Heed works on the mail in your Gmail. It reads what doesn't need you and drafts replies for what does. Nothing is sent until you tap Send, and Heed never deletes or archives anything."
      />

      {hasAccount && (
        <View className="mt-6 overflow-hidden rounded-xl border-hairline border-line bg-surface">
          {mailAccounts.map((account, index) => (
            <View key={account.id}>
              {index > 0 && <View className="ml-[62px] h-px bg-line" />}
              <View className="flex-row items-center gap-3 px-3.5 py-3">
                <InitialAvatar label={account.email} color={accountColor(account.email)} />
                <AppText type="body" numberOfLines={1} className="flex-1 font-inter-medium">
                  {account.email}
                </AppText>
                <CircleCheck size={18} color={accent} strokeWidth={2} />
              </View>
            </View>
          ))}
        </View>
      )}

      <AppButton
        type={hasAccount ? "secondary" : "submit"}
        label={hasAccount ? "Connect another account" : "Connect Gmail"}
        onPress={onConnect}
        isLoading={isConnecting}
        className="mt-6"
      />

      {!hasAccount && (
        <AppText type="caption" className="mt-3 text-center">
          {"On Google's screen, tick the Gmail box so Heed can read and send your mail."}
        </AppText>
      )}
    </View>
  );
};
