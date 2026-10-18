import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ask() {
  const { accent } = useThemeColors();

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="px-5 pt-2">
        <AppText type="display">Ask</AppText>
        <AppText type="subtitle" className="mt-1.5">
          Questions about your mail
        </AppText>
      </View>

      <EmptyState
        illustration="emptyAsk"
        accentColor={accent}
        title="Nothing asked yet"
        subtitle="Questions about your inbox and their answers will appear here"
      />
    </SafeAreaView>
  );
}
