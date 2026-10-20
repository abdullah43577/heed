import { BacklogResults } from "@/components/handled/backlog-results";
import { HandledSummary } from "@/components/handled/handled-summary";
import { MessageGroup } from "@/components/messages/message-group";
import { RuleEditorSheet } from "@/components/rules/rule-editor-sheet";
import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { IconButton } from "@/components/shared/icon-button";
import { HANDLED_CATEGORY_ORDER } from "@/constants/categories";
import { useGetBacklogRuns } from "@/hooks/backlog/use-get-backlog-runs";
import { useGetHandledMessages } from "@/hooks/messages/use-get-handled-messages";
import { useSenderRuleSheet } from "@/hooks/rules/use-sender-rule-sheet";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { isWithinLastDays } from "@/utils/format-date";
import { useRouter } from "expo-router";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BacklogRun } from "../../../../../types/backlog";
import { EmailMessage } from "../../../../../types/email-message";

const RECENT_TIDY_DAYS = 7;

export default function Handled() {
  const router = useRouter();
  const { accent } = useThemeColors();
  const { handledMessages, hasLoadedHandledMessages, isFetchingHandledMessages, refetchHandledMessages } =
    useGetHandledMessages();
  const { backlogRuns, refetchBacklogRuns } = useGetBacklogRuns();
  const ruleSheet = useSenderRuleSheet();

  const groups = HANDLED_CATEGORY_ORDER.map((category) => ({
    category,
    messages: handledMessages.filter((message) => message.category === category),
  })).filter((group) => group.messages.length > 0);

  const count = (predicate: (message: EmailMessage) => boolean) => handledMessages.filter(predicate).length;

  const recentTidies = backlogRuns.filter(
    (run) => run.status === "DONE" && !!run.finishedAt && isWithinLastDays(run.finishedAt, RECENT_TIDY_DAYS),
  );

  const handlePressMessage = function (message: EmailMessage) {
    router.push({ pathname: "/(dashboard)/(tabs)/handled/message-detail", params: { messageId: message.id } });
  };

  const handlePressTidy = function (run: BacklogRun) {
    router.push({ pathname: "/(dashboard)/(tabs)/handled/backlog", params: { runId: run.id } });
  };

  const handleRefresh = function () {
    refetchHandledMessages();
    refetchBacklogRuns();
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingHandledMessages && hasLoadedHandledMessages}
            onRefresh={handleRefresh}
            tintColor={accent}
          />
        }
      >
        <View className="flex-row items-start px-5 pt-2">
          <View className="flex-1">
            <AppText type="display">Handled</AppText>
            <AppText type="subtitle" className="mt-1.5">
              What Heed read for you today
            </AppText>
          </View>
          <IconButton
            icon="newspaper-outline"
            onPress={() => router.push("/(dashboard)/(tabs)/handled/reports")}
            className="mt-1"
          />
        </View>

        {!hasLoadedHandledMessages ? (
          <View className="flex-1 items-center justify-center py-16">
            <ActivityIndicator color={accent} />
          </View>
        ) : groups.length === 0 && recentTidies.length === 0 ? (
          <EmptyState
            illustration="emptyHandled"
            accentColor={accent}
            title="Nothing handled yet today"
            subtitle="Mail Heed reads for you shows up here, with a one-line preview of each"
          />
        ) : (
          <View className="gap-8 px-5 pt-6">
            {groups.length > 0 && (
              <HandledSummary
                readCount={count((message) => message.action === "MARKED_READ")}
                leftCount={count((message) => message.category === "UNSURE")}
                worthALookCount={count((message) => message.category === "IMPORTANT")}
              />
            )}

            <BacklogResults runs={recentTidies} onPressRun={handlePressTidy} />

            {groups.map((group) => (
              <MessageGroup
                key={group.category}
                category={group.category}
                messages={group.messages}
                onPressMessage={handlePressMessage}
                onLongPressMessage={ruleSheet.openFor}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {ruleSheet.sheetProps && <RuleEditorSheet {...ruleSheet.sheetProps} />}
    </SafeAreaView>
  );
}
