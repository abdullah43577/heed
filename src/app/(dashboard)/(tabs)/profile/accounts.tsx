import { MailAccountList } from "@/components/mail-accounts/mail-account-list";
import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { ScreenHeader } from "@/components/shared/screen-header";
import { MAX_MAIL_ACCOUNTS } from "@/constants/mail-accounts";
import { useConnectMailAccount } from "@/hooks/mail-accounts/use-connect-mail-account";
import { useDisconnectMailAccount } from "@/hooks/mail-accounts/use-disconnect-mail-account";
import { useGetMailAccounts } from "@/hooks/mail-accounts/use-get-mail-accounts";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MailAccount } from "../../../../../types/mail-account";

export default function Accounts() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const [pendingDisconnect, setPendingDisconnect] = useState<MailAccount | null>(null);

  const { mailAccounts, hasLoadedMailAccounts, isFetchingMailAccounts, refetchMailAccounts } =
    useGetMailAccounts();
  const { connectMailAccount, isConnectingMailAccount } = useConnectMailAccount();
  const { disconnectMailAccount, isDisconnectingMailAccount } = useDisconnectMailAccount({
    onSuccess: () => setPendingDisconnect(null),
  });

  const isAtLimit = mailAccounts.length >= MAX_MAIL_ACCOUNTS;
  const isBusy = isConnectingMailAccount || isDisconnectingMailAccount;

  const handleConfirmDisconnect = function () {
    if (pendingDisconnect) disconnectMailAccount({ id: pendingDisconnect.id });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScreenHeader title="Gmail accounts" onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingMailAccounts && hasLoadedMailAccounts}
            onRefresh={() => refetchMailAccounts()}
            tintColor={accent}
          />
        }
      >
        {!hasLoadedMailAccounts ? (
          <View className="flex-1 items-center justify-center py-16">
            <ActivityIndicator color={accent} />
          </View>
        ) : mailAccounts.length === 0 ? (
          <EmptyState
            illustration="emptyAccounts"
            accentColor={accent}
            title="Connect your Gmail"
            subtitle="Heed reads the mail that doesn't need you and drafts replies for the mail that does. Nothing is ever sent without you."
            buttonText="Connect a Gmail account"
            onButtonPress={() => connectMailAccount()}
          />
        ) : (
          <>
            <MailAccountList
              accounts={mailAccounts}
              onReconnect={(account) => connectMailAccount(account.email)}
              onDisconnect={setPendingDisconnect}
              disabled={isBusy}
            />

            <AppButton
              type="secondary"
              label="Connect another account"
              onPress={() => connectMailAccount()}
              isLoading={isConnectingMailAccount}
              disabled={isBusy || isAtLimit}
              className="mt-6"
            />

            <AppText type="caption" className="mt-3 text-center">
              {isAtLimit
                ? `That's the most Heed can handle: ${MAX_MAIL_ACCOUNTS} accounts`
                : `Up to ${MAX_MAIL_ACCOUNTS} accounts`}
            </AppText>
          </>
        )}
      </ScrollView>

      <ConfirmDialog
        visible={!!pendingDisconnect}
        title="Disconnect account"
        message={`Heed will stop reading ${pendingDisconnect?.email ?? "this account"} and give its access back to Google. Your mail stays exactly as it is.`}
        confirmLabel="Disconnect"
        variant="delete"
        onConfirm={handleConfirmDisconnect}
        onCancel={() => setPendingDisconnect(null)}
      />
    </SafeAreaView>
  );
}
