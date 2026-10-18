import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Review() {
  const { accent } = useThemeColors();

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="px-5 pt-2">
        <AppText type="display">Review</AppText>
        <AppText type="subtitle" className="mt-1.5">
          Replies waiting for you
        </AppText>
      </View>

      <EmptyState
        illustration="emptyReview"
        accentColor={accent}
        title="Nothing to review"
        subtitle="When an email needs a reply, Heed drafts one and it waits here for you to send"
      />
    </SafeAreaView>
  );
}
