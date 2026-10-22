import { AppText } from "@/components/shared/app-text";
import { Pressable, View } from "react-native";

interface Props {
  onRetry: () => void;
  disabled: boolean;
}

export const AskUnanswered = function ({ onRetry, disabled }: Props) {
  return (
    <View className="flex-row items-center gap-3">
      <AppText type="subtitle" className="flex-1">
        Not answered yet
      </AppText>
      <Pressable onPress={onRetry} disabled={disabled} hitSlop={10} className="active:opacity-70">
        <AppText type="link">Try again</AppText>
      </Pressable>
    </View>
  );
};
