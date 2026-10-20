import { AccountHeaderCard } from "@/components/mail-accounts/account-header-card";
import { SettingsCard } from "@/components/profile/settings-card";
import { SettingsRow } from "@/components/profile/settings-row";
import { AppButton } from "@/components/shared/app-button";
import { ScreenHeader } from "@/components/shared/screen-header";
import { BACKLOG_ACTIVE_STATUSES, BACKLOG_STATUS_LABEL } from "@/constants/backlog";
import { useGetBacklogRuns } from "@/hooks/backlog/use-get-backlog-runs";
import { useConnectMailAccount } from "@/hooks/mail-accounts/use-connect-mail-account";
import { useGetMailAccounts } from "@/hooks/mail-accounts/use-get-mail-accounts";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountDetail() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { accountId } = useLocalSearchParams<{ accountId: string }>();

  const { mailAccounts, hasLoadedMailAccounts } = useGetMailAccounts();
  const { backlogRuns } = useGetBacklogRuns({ mailAccountId: accountId, shouldFetch: !!accountId });
  const { connectMailAccount, isConnectingMailAccount } = useConnectMailAccount();

  const account = mailAccounts.find((candidate) => candidate.id === accountId);
  const latestRun = backlogRuns[0];
  const runLabel =
    latestRun && BACKLOG_ACTIVE_STATUSES.includes(latestRun.status) ? BACKLOG_STATUS_LABEL[latestRun.status] : undefined;

  const handleOpenBacklog = function () {
    router.push({ pathname: "/(dashboard)/(tabs)/profile/backlog", params: { accountId } });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScreenHeader title="Gmail account" onBack={() => router.back()} />

      {!account ? (
        <View className="flex-1 items-center justify-center">
          {!hasLoadedMailAccounts && <ActivityIndicator color={accent} />}
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-4 px-5 pb-10 pt-5"
          showsVerticalScrollIndicator={false}
        >
          <AccountHeaderCard account={account} />

          {account.status === "NEEDS_REAUTH" && (
            <AppButton
              type="submit"
              label="Reconnect"
              onPress={() => connectMailAccount(account.email)}
              isLoading={isConnectingMailAccount}
            />
          )}

          <SettingsCard title="Inbox">
            <SettingsRow
              label="Tidy my backlog"
              withDivider
              {...(runLabel !== undefined && { value: runLabel })}
              onPress={handleOpenBacklog}
            />
          </SettingsCard>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
