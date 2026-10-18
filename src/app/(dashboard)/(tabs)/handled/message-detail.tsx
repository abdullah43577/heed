import { MessageAction, MessageActions } from "@/components/message-detail/message-actions";
import { MessageInsight } from "@/components/message-detail/message-insight";
import { MessageOverview } from "@/components/message-detail/message-overview";
import { ScreenHeader } from "@/components/shared/screen-header";
import { useGetMessage } from "@/hooks/messages/use-get-message";
import { useMessageActions } from "@/hooks/messages/use-message-actions";
import { useThemeColors } from "@/hooks/use-theme-colors";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessageDetail() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { messageId } = useLocalSearchParams<{ messageId: string }>();

  const { message, isFetchingMessage } = useGetMessage({ messageId, shouldFetch: !!messageId });
  const { undoMarkRead, dismissReply, createSenderRule, isActing } = useMessageActions();

  if (!message) {
    return (
      <SafeAreaView className="flex-1 bg-canvas">
        <ScreenHeader title="Email" onBack={() => router.back()} />
        <View className="flex-1 items-center justify-center">
          {isFetchingMessage && <ActivityIndicator color={accent} />}
        </View>
      </SafeAreaView>
    );
  }

  const handleNeverAutoRead = function () {
    createSenderRule({ pattern: message.fromEmail, kind: "ALWAYS_LEAVE" });
    if (message.action === "MARKED_READ") undoMarkRead({ id: message.id });
  };

  const handleOpenInGmail = function () {
    Linking.openURL(
      `https://mail.google.com/mail/u/${encodeURIComponent(message.mailAccount.email)}/#all/${message.gmailMessageId}`,
    );
  };

  const actions: MessageAction[] = [
    ...(message.action === "AWAITING_REPLY"
      ? [{ key: "dismiss", label: "No reply needed", icon: "checkmark-done-outline" as const, onPress: () => dismissReply({ id: message.id }) }]
      : []),
    ...(message.action === "MARKED_READ"
      ? [{ key: "undo", label: "Mark unread in Gmail", icon: "mail-unread-outline" as const, onPress: () => undoMarkRead({ id: message.id }) }]
      : []),
    { key: "never", label: "Never auto-read this sender", icon: "hand-left-outline", onPress: handleNeverAutoRead },
    { key: "gmail", label: "Open in Gmail", icon: "open-outline", onPress: handleOpenInGmail },
  ];

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScreenHeader title="Email" onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-5 pb-10 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <MessageOverview message={message} />
        <MessageInsight message={message} />
        <MessageActions actions={actions} disabled={isActing} />
      </ScrollView>
    </SafeAreaView>
  );
}
