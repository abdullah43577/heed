import { BacklogDoneCard } from "@/components/backlog/backlog-done-card";
import { BacklogMessageSection } from "@/components/backlog/backlog-message-section";
import { BacklogProgressCard } from "@/components/backlog/backlog-progress-card";
import { BacklogStartCard } from "@/components/backlog/backlog-start-card";
import { BacklogSummaryCard } from "@/components/backlog/backlog-summary-card";
import { CategoryCounts } from "@/components/messages/category-counts";
import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { ScreenHeader } from "@/components/shared/screen-header";
import { useBacklogActions } from "@/hooks/backlog/use-backlog-actions";
import { useGetBacklogRun } from "@/hooks/backlog/use-get-backlog-run";
import { useGetBacklogRuns } from "@/hooks/backlog/use-get-backlog-runs";
import { useGetMailAccounts } from "@/hooks/mail-accounts/use-get-mail-accounts";
import { useSiblingRoute } from "@/hooks/use-sibling-route";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BacklogWindow } from "../../../../../types/backlog";
import { EmailMessage } from "../../../../../types/email-message";

const FAILED_NOTE = "The last tidy stopped because Heed lost access to this account. Nothing in Gmail changed.";

export default function Backlog() {
  const router = useRouter();
  const sibling = useSiblingRoute();
  const { accent } = useThemeColors();
  const params = useLocalSearchParams<{ accountId?: string; runId?: string }>();

  const [windowDays, setWindowDays] = useState<BacklogWindow>(30);
  const [startedRunId, setStartedRunId] = useState<string | null>(null);
  const [isStartingOver, setIsStartingOver] = useState(false);
  const [confirm, setConfirm] = useState<"apply" | "cancel" | null>(null);

  const { mailAccounts } = useGetMailAccounts();
  const { backlogRuns, hasLoadedBacklogRuns } = useGetBacklogRuns({
    mailAccountId: params.accountId ?? "",
    shouldFetch: !!params.accountId && !params.runId,
  });

  const runId = startedRunId ?? params.runId ?? backlogRuns[0]?.id ?? "";
  const { backlogRun, isFetchingBacklogRun, refetchBacklogRun } = useGetBacklogRun({ runId, shouldFetch: !!runId });

  const accountId = params.accountId ?? backlogRun?.mailAccountId;
  const account = mailAccounts.find((candidate) => candidate.id === accountId) ?? backlogRun?.mailAccount;
  const needsReconnect = account?.status === "NEEDS_REAUTH";

  const { startBacklog, applyBacklog, cancelBacklog, isStarting, isApplying, isCancelling } = useBacklogActions({
    onStarted: (run) => {
      setStartedRunId(run.id);
      setIsStartingOver(false);
    },
  });

  const isLoading = (!!params.accountId && !params.runId && !hasLoadedBacklogRuns) || (!!runId && !backlogRun);
  const status = backlogRun?.status;
  const showStart = !isLoading && (isStartingOver || !backlogRun || status === "CANCELLED" || status === "FAILED");

  const handleStart = function () {
    if (accountId) startBacklog({ mailAccountId: accountId, windowDays });
  };

  const handleConfirm = function () {
    if (!backlogRun) return;
    if (confirm === "apply") applyBacklog({ id: backlogRun.id });
    if (confirm === "cancel") cancelBacklog({ id: backlogRun.id });
    setConfirm(null);
  };

  const handlePressMessage = function (message: EmailMessage) {
    router.push({ pathname: sibling("message-detail"), params: { messageId: message.id } });
  };

  const toMarkRead = backlogRun?.summary.toMarkRead ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScreenHeader title="Tidy the backlog" onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-5 pb-10 pt-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingBacklogRun && !!backlogRun}
            onRefresh={() => refetchBacklogRun()}
            tintColor={accent}
          />
        }
      >
        {account && (
          <AppText type="subtitle" className="-mb-4">
            {account.email}
          </AppText>
        )}

        {isLoading ? (
          <View className="items-center py-16">
            <ActivityIndicator color={accent} />
          </View>
        ) : showStart ? (
          <BacklogStartCard
            windowDays={windowDays}
            onWindowChange={setWindowDays}
            onStart={handleStart}
            isStarting={isStarting}
            disabled={!accountId || needsReconnect}
            note={needsReconnect ? "Reconnect this account first." : status === "FAILED" && !isStartingOver ? FAILED_NOTE : null}
          />
        ) : backlogRun && (status === "SCANNING" || status === "SORTING" || status === "APPLYING") ? (
          <>
            <BacklogProgressCard run={backlogRun} toMarkRead={toMarkRead} />
            {status !== "APPLYING" && (
              <AppButton
                type="secondary"
                label="Cancel"
                onPress={() => setConfirm("cancel")}
                isLoading={isCancelling}
              />
            )}
          </>
        ) : backlogRun ? (
          <>
            {status === "READY" ? (
              <BacklogSummaryCard
                summary={backlogRun.summary}
                truncated={backlogRun.truncated}
                onApply={() => setConfirm("apply")}
                isApplying={isApplying}
                disabled={isCancelling || needsReconnect}
              />
            ) : (
              <BacklogDoneCard run={backlogRun} onTidyAgain={() => setIsStartingOver(true)} />
            )}

            {status === "READY" && (
              <CategoryCounts byCategory={backlogRun.summary.byCategory} title="What Heed found" />
            )}

            <BacklogMessageSection
              title="Might still need a reply"
              caption="Left unread. Open one to mark it as needing no reply."
              messages={backlogRun.mightNeedReply}
              onPressMessage={handlePressMessage}
            />
            <BacklogMessageSection
              title="Left for you"
              caption="Heed couldn't tell from the preview, so it left these alone."
              messages={backlogRun.leftForYou}
              onPressMessage={handlePressMessage}
            />

            {status === "READY" && (
              <AppButton
                type="secondary"
                label="Cancel this tidy"
                onPress={() => setConfirm("cancel")}
                isLoading={isCancelling}
                disabled={isApplying}
              />
            )}
          </>
        ) : null}
      </ScrollView>

      <ConfirmDialog
        visible={confirm === "apply"}
        title={`Mark ${toMarkRead.toLocaleString()} as read`}
        message="Heed will mark them as read in Gmail and label them Heed/Handled. They stay in your inbox. You can mark any of them unread again later."
        confirmLabel="Mark as read"
        cancelLabel="Not now"
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />

      <ConfirmDialog
        visible={confirm === "cancel"}
        title="Cancel this tidy"
        message="Heed will forget what it sorted. Nothing in Gmail has changed, and nothing will."
        confirmLabel="Cancel tidy"
        cancelLabel="Keep going"
        variant="delete"
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />
    </SafeAreaView>
  );
}
