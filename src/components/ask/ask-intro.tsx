import { Illustration } from "@/components/illustrations/illustration";
import { AppText } from "@/components/shared/app-text";
import { ASK_SUGGESTIONS } from "@/constants/ask";
import { Pressable, View } from "react-native";

interface Props {
  onPickSuggestion: (question: string) => void;
}

export const AskIntro = function ({ onPickSuggestion }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-5 py-10">
      <Illustration name="emptyAsk" />
      <AppText type="label" className="mt-5 text-center text-[16px] leading-[22px]">
        Ask your inbox
      </AppText>
      <AppText type="subtitle" className="mt-1.5 text-center">
        Heed searches every connected account and shows the emails behind each answer. It only reads; it never sends
        or changes anything.
      </AppText>

      <View className="mt-6 w-full gap-2">
        {ASK_SUGGESTIONS.map((suggestion) => (
          <Pressable
            key={suggestion}
            onPress={() => onPickSuggestion(suggestion)}
            className="rounded-lg border-hairline border-line bg-surface px-3.5 py-3 active:bg-surface-muted"
          >
            <AppText type="body">{suggestion}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
