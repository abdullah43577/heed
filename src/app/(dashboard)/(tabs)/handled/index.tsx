import { AppText } from "@/components/shared/app-text";
import { EmptyState } from "@/components/shared/empty-state";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Handled() {
  const { accent } = useThemeColors();

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="px-5 pt-2">
        <AppText type="display">Handled</AppText>
        <AppText type="subtitle" className="mt-1.5">
          What Heed read for you today
        </AppText>
      </View>

      <EmptyState
        illustration="emptyHandled"
        accentColor={accent}
        title="Nothing handled yet"
        subtitle="Mail Heed reads for you shows up here, with a one-line preview of each"
      />
    </SafeAreaView>
  );
}
