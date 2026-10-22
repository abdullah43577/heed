import { AskAnswer } from "@/components/ask/ask-answer";
import { AskComposer } from "@/components/ask/ask-composer";
import { AskIntro } from "@/components/ask/ask-intro";
import { AskProgress } from "@/components/ask/ask-progress";
import { AskQuestion } from "@/components/ask/ask-question";
import { AskUnanswered } from "@/components/ask/ask-unanswered";
import { AppText } from "@/components/shared/app-text";
import { BottomSheetPicker } from "@/components/shared/bottom-sheet-picker";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { IconButton } from "@/components/shared/icon-button";
import { TAB_BAR_HEIGHT } from "@/constants/theme";
import { useAskActions } from "@/hooks/ask/use-ask-actions";
import { useAskAnswer } from "@/hooks/ask/use-ask-answer";
import { useGetAskConversation } from "@/hooks/ask/use-get-ask-conversation";
import { useGetAskConversations } from "@/hooks/ask/use-get-ask-conversations";
import { useKeyboardHeight } from "@/hooks/use-keyboard-height";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatRelativeDate } from "@/utils/format-date";
import { gmailMessageUrl } from "@/utils/gmail-url";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AskCitation } from "../../../../../types/ask";

export default function Ask() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const { accent } = useThemeColors();
  const scrollRef = useRef<ScrollView>(null);

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const { askConversations } = useGetAskConversations();
  const { askConversation, isFetchingAskConversation } = useGetAskConversation({ conversationId });
  const { answering, streamAnswer } = useAskAnswer();
  const { startConversation, addQuestion, deleteConversation, isAsking, isDeletingConversation } = useAskActions({
    onAsked: (conversation) => {
      setConversationId(conversation.id);
      setQuestion("");
      streamAnswer(conversation.id);
    },
  });

  const messages = askConversation?.messages ?? [];
  const isAnsweringHere = !!answering && answering.conversationId === conversationId;
  const isWaiting = !isAnsweringHere && messages.at(-1)?.role === "USER";
  const isBusy = isAsking || !!answering;

  // The tab bar sits under the keyboard, so the composer only needs to clear what is left above it.
  const keyboardLift = Math.max(0, keyboardHeight - TAB_BAR_HEIGHT - insets.bottom);

  const handleAsk = function (text = question) {
    const trimmed = text.trim();
    if (trimmed.length < 2 || isBusy) return;
    if (conversationId) addQuestion({ conversationId, question: trimmed });
    else startConversation({ question: trimmed });
  };

  const handlePressCitation = function (citation: AskCitation) {
    if (citation.emailMessageId) {
      router.push({ pathname: "/(dashboard)/(tabs)/ask/message-detail", params: { messageId: citation.emailMessageId } });
      return;
    }
    Linking.openURL(gmailMessageUrl(citation.accountEmail, citation.gmailMessageId));
  };

  const handleDelete = function () {
    if (!conversationId) return;
    deleteConversation(
      { id: conversationId },
      {
        onSuccess: () => {
          setIsConfirmingDelete(false);
          setConversationId(null);
        },
      },
    );
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <View className="flex-row items-start px-5 pt-2">
        <View className="flex-1">
          <AppText type="display">Ask</AppText>
          <AppText type="subtitle" className="mt-1.5">
            Questions about your mail
          </AppText>
        </View>
        <View className="mt-1 flex-row">
          {conversationId && (
            <IconButton icon="trash-outline" onPress={() => setIsConfirmingDelete(true)} disabled={isBusy} />
          )}
          {askConversations.length > 0 && (
            <IconButton icon="time-outline" onPress={() => setIsHistoryOpen(true)} disabled={isBusy} />
          )}
          {conversationId && (
            <IconButton icon="add" size={24} onPress={() => setConversationId(null)} disabled={isBusy} />
          )}
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="flex-grow gap-6 px-5 pb-6 pt-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {!conversationId ? (
          <AskIntro onPickSuggestion={setQuestion} />
        ) : !askConversation ? (
          <View className="flex-1 items-center justify-center">
            {isFetchingAskConversation && <ActivityIndicator color={accent} />}
          </View>
        ) : (
          <>
            {messages.map((message) =>
              message.role === "USER" ? (
                <AskQuestion key={message.id} text={message.content} />
              ) : (
                <AskAnswer key={message.id} message={message} onPressCitation={handlePressCitation} />
              ),
            )}
            {isAnsweringHere && <AskProgress status={answering.status} text={answering.text} />}
            {isWaiting && <AskUnanswered onRetry={() => streamAnswer(askConversation.id)} disabled={isBusy} />}
          </>
        )}
      </ScrollView>

      <View style={{ marginBottom: keyboardLift }}>
        <AskComposer value={question} onChange={setQuestion} onSubmit={() => handleAsk()} disabled={isBusy} />
      </View>

      <BottomSheetPicker
        visible={isHistoryOpen}
        title="Earlier questions"
        selectedValue={conversationId}
        options={askConversations.map((conversation) => ({
          label: conversation.title,
          value: conversation.id,
          description: formatRelativeDate(conversation.updatedAt),
        }))}
        searchPlaceholder="Search your questions"
        emptyLabel="No earlier questions"
        onSelect={(id) => {
          setConversationId(id);
          setIsHistoryOpen(false);
        }}
        onClose={() => setIsHistoryOpen(false)}
      />

      <ConfirmDialog
        visible={isConfirmingDelete}
        title="Delete this conversation?"
        message="The questions and answers are removed from Heed. Your mail is not touched."
        confirmLabel="Delete"
        variant="delete"
        isLoading={isDeletingConversation}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmingDelete(false)}
      />
    </SafeAreaView>
  );
}
