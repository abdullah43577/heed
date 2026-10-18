import { IncomingList } from "@/components/handled/incoming-list";
import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { useGetMessages } from "@/hooks/messages/use-get-messages";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Handled() {
  const { accent } = useThemeColors();
  const { messages, hasLoadedMessages, isFetchingMessages, refetchMessages } = useGetMessages();

  // Step 2 only: proves mail arrives before triage exists. Replaced in step 3.
  const showIncoming = __DEV__ && messages.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingMessages && hasLoadedMessages}
            onRefresh={() => refetchMessages()}
            tintColor={accent}
          />
        }
      >
        <View className="px-5 pt-2">
          <AppText type="display">Handled</AppText>
          <AppText type="subtitle" className="mt-1.5">
            What Heed read for you today
          </AppText>
        </View>

        {showIncoming ? (
          <View className="mt-8 px-5">
            <SectionHeader title="Incoming (dev only)" />
            <IncomingList messages={messages} />
          </View>
        ) : (
          <EmptyState
            illustration="emptyHandled"
            accentColor={accent}
            title="Nothing handled yet"
            subtitle="Mail Heed reads for you shows up here, with a one-line preview of each"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
