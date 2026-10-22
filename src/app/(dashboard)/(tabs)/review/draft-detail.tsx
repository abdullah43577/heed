import { DraftBodyInput } from "@/components/review/draft-editor/draft-body-input";
import { DraftRecipients } from "@/components/review/draft-editor/draft-recipients";
import { DraftRewriteBar } from "@/components/review/draft-editor/draft-rewrite-bar";
import { DraftSendBar } from "@/components/review/draft-editor/draft-send-bar";
import { DraftStatusNote } from "@/components/review/draft-editor/draft-status-note";
import { DraftThread } from "@/components/review/draft-editor/draft-thread";
import { ScreenHeader } from "@/components/shared/screen-header";
import { OPEN_DRAFT_STATUSES } from "@/constants/drafts";
import { useDraftActions } from "@/hooks/drafts/use-draft-actions";
import { useDraftEditor } from "@/hooks/drafts/use-draft-editor";
import { useGetDraft } from "@/hooks/drafts/use-get-draft";
import { useSendCountdown } from "@/hooks/drafts/use-send-countdown";
import { refreshMessageQueries } from "@/hooks/messages/refresh-message-queries";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { findPlaceholders } from "@/utils/placeholders";
import { showToast } from "@/utils/show-toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DraftDetail() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { draftId } = useLocalSearchParams<{ draftId: string }>();

  const { draft, isFetchingDraft } = useGetDraft({ draftId, shouldFetch: !!draftId });
  const { mode, secondsLeft, startCountdown } = useSendCountdown(draft);

  const { saveDraft, rewriteDraft, sendDraft, undoSend, dismissDraft, isRewriting, isSending, isUndoing, isDismissing } =
    useDraftActions({
      onRewritten: (next) => replaceBody(next.body),
      onScheduled: () => startCountdown(),
      onDismissed: () => router.back(),
    });

  const { body, setBody, replaceBody, replyAll, setReplyAll, isEditable } = useDraftEditor(draft, saveDraft);

  const previousStatus = useRef(draft?.status);
  useEffect(() => {
    const was = previousStatus.current;
    previousStatus.current = draft?.status;
    if (draft?.status === "SENT" && (was === "SCHEDULED" || was === "SENDING")) {
      showToast("success", "Sent");
      refreshMessageQueries();
      router.back();
    }
  }, [draft?.status]);

  if (!draft) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
        <ScreenHeader title="Reply" onBack={() => router.back()} />
        <View className="flex-1 items-center justify-center">
          {isFetchingDraft && <ActivityIndicator color={accent} />}
        </View>
      </SafeAreaView>
    );
  }

  const accountNeedsReconnect = draft.emailMessage.mailAccount.status !== "ACTIVE";
  const placeholders = findPlaceholders(body);
  const isOpen = OPEN_DRAFT_STATUSES.includes(draft.status);
  const isBusy = isRewriting || isSending || isUndoing || isDismissing;

  const blockedReason = accountNeedsReconnect
    ? "Reconnect this account to send"
    : !body.trim()
      ? "Write something to send"
      : placeholders.length > 0
        ? "Fill in the highlighted parts to send"
        : null;

  const handleReplyAllChange = function (next: boolean) {
    setReplyAll(next);
    saveDraft({ id: draft.id, replyAll: next });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScreenHeader title="Reply" onBack={() => router.back()} />

      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={40}
        keyboardShouldPersistTaps="handled"
      >
        <DraftStatusNote draft={draft} accountNeedsReconnect={accountNeedsReconnect} />
        <DraftThread subject={draft.emailMessage.subject} thread={draft.thread} />
        <DraftRecipients
          recipients={draft.recipients}
          replyAll={replyAll}
          onChange={handleReplyAllChange}
          disabled={!isEditable || isBusy}
        />
        <DraftBodyInput value={body} onChange={setBody} editable={isEditable && !isBusy} />
        {isEditable && (
          <DraftRewriteBar
            onPreset={(preset) => rewriteDraft({ id: draft.id, preset, body })}
            onInstruction={(instruction) => rewriteDraft({ id: draft.id, instruction, body })}
            disabled={isBusy || accountNeedsReconnect}
          />
        )}
      </KeyboardAwareScrollView>

      {isOpen && (
        <SafeAreaView edges={["bottom"]} className="bg-surface">
          <DraftSendBar
            mode={mode}
            secondsLeft={secondsLeft}
            canSend={!blockedReason}
            blockedReason={blockedReason}
            onSend={() => sendDraft({ id: draft.id, body, replyAll })}
            onUndo={() => undoSend({ id: draft.id })}
            onDismiss={() => dismissDraft({ id: draft.id })}
            isBusy={isBusy}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
