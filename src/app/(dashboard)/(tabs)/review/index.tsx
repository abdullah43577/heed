import { ReviewCard } from "@/components/review/review-card";
import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { useGetReviewMessages } from "@/hooks/messages/use-get-review-messages";
import { useMessageActions } from "@/hooks/messages/use-message-actions";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useRouter } from "expo-router";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Review() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { reviewMessages, hasLoadedReviewMessages, isFetchingReviewMessages, refetchReviewMessages } =
    useGetReviewMessages();
  const { dismissReply, isActing } = useMessageActions();

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
            {reviewMessages.length > 0
              ? `${reviewMessages.length} waiting on a reply from you`
              : "Replies waiting for you"}
          </AppText>
        </View>

        {!hasLoadedReviewMessages ? (
          <View className="flex-1 items-center justify-center py-16">
            <ActivityIndicator color={accent} />
          </View>
        ) : reviewMessages.length === 0 ? (
          <EmptyState
            illustration="emptyReview"
            accentColor={accent}
            title="Nothing to review"
            subtitle="When someone is waiting on a reply from you, their email lands here"
          />
        ) : (
          <View className="gap-3 px-5 pt-6">
            {reviewMessages.map((message) => (
              <ReviewCard
                key={message.id}
                message={message}
                disabled={isActing}
                onPress={() =>
                  router.push({
                    pathname: "/(dashboard)/(tabs)/review/message-detail",
                    params: { messageId: message.id },
                  })
                }
                onDismiss={() => dismissReply({ id: message.id })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
