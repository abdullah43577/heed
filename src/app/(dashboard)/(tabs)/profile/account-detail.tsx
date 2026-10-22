import { AccountHeaderCard } from "@/components/mail-accounts/account-header-card";
import { InstructionCard } from "@/components/mail-accounts/instruction-card";
import { WritingStyleCard } from "@/components/mail-accounts/writing-style-card";
import { SettingsCard } from "@/components/profile/settings-card";
import { SettingsRow } from "@/components/profile/settings-row";
import { RuleEditorSheet } from "@/components/rules/rule-editor-sheet";
import { RuleList } from "@/components/rules/rule-list";
import { AppButton } from "@/components/shared/app-button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { ScreenHeader } from "@/components/shared/screen-header";
import { BACKLOG_ACTIVE_STATUSES, BACKLOG_STATUS_LABEL } from "@/constants/backlog";
import { RULE_KIND_META } from "@/constants/rules";
import { useGetBacklogRuns } from "@/hooks/backlog/use-get-backlog-runs";
import { useAccountInstruction } from "@/hooks/mail-accounts/use-account-instruction";
import { useConnectMailAccount } from "@/hooks/mail-accounts/use-connect-mail-account";
import { useGetMailAccounts } from "@/hooks/mail-accounts/use-get-mail-accounts";
import { useWritingStyle } from "@/hooks/mail-accounts/use-writing-style";
import { useGetSenderRules } from "@/hooks/rules/use-get-sender-rules";
import { useSenderRuleActions } from "@/hooks/rules/use-sender-rule-actions";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { SenderRule } from "../../../../../types/sender-rule";

export default function AccountDetail() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { accountId } = useLocalSearchParams<{ accountId: string }>();

  const { mailAccounts, hasLoadedMailAccounts } = useGetMailAccounts();
  const { backlogRuns } = useGetBacklogRuns({ mailAccountId: accountId, shouldFetch: !!accountId });
  const { senderRules } = useGetSenderRules({ mailAccountId: accountId, shouldFetch: !!accountId });
  const { connectMailAccount, isConnectingMailAccount } = useConnectMailAccount();

  const [isEditingStyle, setIsEditingStyle] = useState(false);
  const [ruleSheetVisible, setRuleSheetVisible] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<SenderRule | null>(null);

  const { learnStyle, isLearningStyle, saveStyleNote, isSavingStyleNote } = useWritingStyle({
    onSaved: () => setIsEditingStyle(false),
  });
  const { saveInstruction, isSavingInstruction } = useAccountInstruction();
  const { saveRule, deleteRule, isSavingRule, isDeletingRule } = useSenderRuleActions({
    onSaved: () => setRuleSheetVisible(false),
    onDeleted: () => setPendingDelete(null),
  });

  const account = mailAccounts.find((candidate) => candidate.id === accountId);
  const latestRun = backlogRuns[0];
  const runLabel =
    latestRun && BACKLOG_ACTIVE_STATUSES.includes(latestRun.status) ? BACKLOG_STATUS_LABEL[latestRun.status] : undefined;

  const handleOpenBacklog = function () {
    router.push({ pathname: "/(dashboard)/(tabs)/profile/backlog", params: { accountId } });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScreenHeader title="Gmail account" onBack={() => router.back()} />

      {!account ? (
        <View className="flex-1 items-center justify-center">
          {!hasLoadedMailAccounts && <ActivityIndicator color={accent} />}
        </View>
      ) : (
        <KeyboardAwareScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-5 pb-8 pt-4"
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          extraScrollHeight={40}
          keyboardShouldPersistTaps="handled"
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

          <SettingsCard title="Sender rules" actionLabel="Add" onPressAction={() => setRuleSheetVisible(true)}>
            <RuleList rules={senderRules} onDelete={setPendingDelete} disabled={isDeletingRule} />
          </SettingsCard>

          <InstructionCard
            account={account}
            onSave={(instruction) => saveInstruction({ id: account.id, instruction })}
            isSaving={isSavingInstruction}
          />

          <WritingStyleCard
            account={account}
            onLearn={() => learnStyle({ id: account.id })}
            onSave={(styleNote) => saveStyleNote({ id: account.id, styleNote })}
            isLearning={isLearningStyle}
            isSaving={isSavingStyleNote}
            isEditing={isEditingStyle}
            onEditingChange={setIsEditingStyle}
          />
        </KeyboardAwareScrollView>
      )}

      {account && (
        <RuleEditorSheet
          visible={ruleSheetVisible}
          onClose={() => setRuleSheetVisible(false)}
          onSave={saveRule}
          isSaving={isSavingRule}
          mailAccountId={account.id}
          accountEmail={account.email}
        />
      )}

      <ConfirmDialog
        visible={!!pendingDelete}
        title="Remove rule"
        message={
          pendingDelete
            ? `"${RULE_KIND_META[pendingDelete.kind].label}" for ${pendingDelete.pattern} stops applying to new mail.`
            : ""
        }
        confirmLabel="Remove"
        variant="delete"
        onConfirm={() => pendingDelete && deleteRule({ id: pendingDelete.id })}
        onCancel={() => setPendingDelete(null)}
      />
    </SafeAreaView>
  );
}
