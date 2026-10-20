import { ReviewCard } from "@/components/review/review-card";
import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { useCreateDraft } from "@/hooks/drafts/use-create-draft";
import { useDraftActions } from "@/hooks/drafts/use-draft-actions";
import { useGetReviewMessages } from "@/hooks/messages/use-get-review-messages";
import { useMessageActions } from "@/hooks/messages/use-message-actions";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useRouter } from "expo-router";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmailMessage } from "../../../../../types/email-message";

export default function Review() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { reviewMessages, hasLoadedReviewMessages, isFetchingReviewMessages, refetchReviewMessages } =
    useGetReviewMessages();
  const { dismissReply, isActing } = useMessageActions();
  const { dismissDraft, isDismissing } = useDraftActions();

  const openDraft = (draftId: string) =>
    router.push({ pathname: "/(dashboard)/(tabs)/review/draft-detail", params: { draftId } });
  const { createDraft, isCreatingDraft } = useCreateDraft({ onCreated: (draft) => openDraft(draft.id) });

  const handlePress = function (message: EmailMessage) {
    if (message.draft) return openDraft(message.draft.id);
    router.push({ pathname: "/(dashboard)/(tabs)/review/message-detail", params: { messageId: message.id } });
  };

  // A drafted email Heed had already read cannot be "dismissed" as a message, only its draft can.
  const handleDismiss = function (message: EmailMessage) {
    if (message.draft) dismissDraft({ id: message.draft.id });
    else dismissReply({ id: message.id });
  };

  const waitingCount = reviewMessages.length;

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingReviewMessages && hasLoadedReviewMessages}
            onRefresh={() => refetchReviewMessages()}
            tintColor={accent}
          />
        }
      >
        <View className="px-5 pt-2">
          <AppText type="display">Review</AppText>
          <AppText type="subtitle" className="mt-1.5">
            {waitingCount > 0 ? `${waitingCount} waiting on a reply from you` : "Replies waiting for you"}
          </AppText>
        </View>

        {!hasLoadedReviewMessages ? (
          <View className="flex-1 items-center justify-center py-16">
            <ActivityIndicator color={accent} />
          </View>
        ) : waitingCount === 0 ? (
          <EmptyState
            illustration="emptyReview"
            accentColor={accent}
            title="Nothing to review"
            subtitle="When someone is waiting on a reply from you, Heed drafts one and it lands here"
          />
        ) : (
          <View className="gap-3 px-5 pt-6">
            {reviewMessages.map((message) => (
              <ReviewCard
                key={message.id}
                message={message}
                disabled={isActing || isDismissing || isCreatingDraft}
                onPress={() => handlePress(message)}
                onDismiss={() => handleDismiss(message)}
                onDraft={() => createDraft({ messageId: message.id })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
