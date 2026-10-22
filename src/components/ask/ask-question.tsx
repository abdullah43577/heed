import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";

export const AskQuestion = function ({ text }: { text: string }) {
  return (
    <View className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent-muted px-4 py-2.5">
      <AppText type="body">{text}</AppText>
    </View>
  );
};
