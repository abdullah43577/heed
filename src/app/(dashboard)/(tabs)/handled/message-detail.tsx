import { MessageAction, MessageActions } from "@/components/message-detail/message-actions";
import { MessageInsight } from "@/components/message-detail/message-insight";
import { MessageOverview } from "@/components/message-detail/message-overview";
import { ScreenHeader } from "@/components/shared/screen-header";
import { OPEN_DRAFT_STATUSES } from "@/constants/drafts";
import { useCreateDraft } from "@/hooks/drafts/use-create-draft";
import { useGetMessage } from "@/hooks/messages/use-get-message";
import { useSiblingRoute } from "@/hooks/use-sibling-route";
import { useMessageActions } from "@/hooks/messages/use-message-actions";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { gmailMessageUrl } from "@/utils/gmail-url";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ban, CheckCheck, ExternalLink, Mail, PenLine } from "lucide-react-native";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessageDetail() {
  const router = useRouter();
  const sibling = useSiblingRoute();
  const { accent } = useThemeColors();
  const { messageId } = useLocalSearchParams<{ messageId: string }>();

  const { message, isFetchingMessage } = useGetMessage({ messageId, shouldFetch: !!messageId });
  const { undoMarkRead, dismissReply, createSenderRule, isActing } = useMessageActions();

  const openDraft = (draftId: string) => router.push({ pathname: sibling("draft-detail"), params: { draftId } });
  const { createDraft, isCreatingDraft } = useCreateDraft({ onCreated: (draft) => openDraft(draft.id) });

  if (!message) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
        <ScreenHeader title="Email" onBack={() => router.back()} />
        <View className="flex-1 items-center justify-center">
          {isFetchingMessage && <ActivityIndicator color={accent} />}
        </View>
      </SafeAreaView>
    );
  }

  // A backlog email that might need a reply is left unread instead of awaiting one.
  const isWaitingOnReply =
    message.action === "AWAITING_REPLY" || (message.category === "NEEDS_REPLY" && message.action === "LEFT_UNREAD");

  const handleNeverAutoRead = function () {
    createSenderRule({ pattern: message.fromEmail, kind: "ALWAYS_LEAVE" });
    if (message.action === "MARKED_READ") undoMarkRead({ id: message.id });
  };

  const handleOpenInGmail = function () {
    Linking.openURL(gmailMessageUrl(message.mailAccount.email, message.gmailMessageId));
  };

  const openDraftId = message.draft && OPEN_DRAFT_STATUSES.includes(message.draft.status) ? message.draft.id : null;

  const actions: MessageAction[] = [
    openDraftId
      ? { key: "draft", label: "Open Heed's draft", icon: PenLine, onPress: () => openDraft(openDraftId) }
      : { key: "draft", label: "Draft a reply", icon: PenLine, onPress: () => createDraft({ messageId: message.id }) },
    ...(isWaitingOnReply
      ? [{ key: "dismiss", label: "No reply needed", icon: CheckCheck, onPress: () => dismissReply({ id: message.id }) }]
      : []),
    ...(message.action === "MARKED_READ"
      ? [{ key: "undo", label: "Mark unread in Gmail", icon: Mail, onPress: () => undoMarkRead({ id: message.id }) }]
      : []),
    { key: "never", label: "Never auto-read this sender", icon: Ban, onPress: handleNeverAutoRead },
    { key: "gmail", label: "Open in Gmail", icon: ExternalLink, onPress: handleOpenInGmail },
  ];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScreenHeader title="Email" onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <MessageOverview message={message} />
        <MessageInsight message={message} />
        <MessageActions actions={actions} disabled={isActing || isCreatingDraft} />
      </ScrollView>
    </SafeAreaView>
  );
}
