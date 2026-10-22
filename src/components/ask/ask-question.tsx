import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";

export const AskQuestion = function ({ text }: { text: string }) {
  return (
    <View className="max-w-[85%] self-end rounded-xl rounded-br-sm bg-accent-muted px-3.5 py-2.5">
      <AppText type="body">{text}</AppText>
    </View>
  );
};
