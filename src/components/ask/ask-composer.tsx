import { ASK_QUESTION_MAX } from "@/constants/ask";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { Pressable, TextInput, View } from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const AskComposer = function ({ value, onChange, onSubmit, disabled }: Props) {
  const { foregroundSubtle, foregroundInverse } = useThemeColors();
  const canSubmit = !disabled && value.trim().length >= 2;

  return (
    <View className="flex-row items-end gap-2 border-t-hairline border-line bg-surface px-4 py-3">
      <TextInput
        value={value}
        onChangeText={onChange}
        multiline
        maxLength={ASK_QUESTION_MAX}
        placeholder="Ask about your mail"
        placeholderTextColor={foregroundSubtle}
        textAlignVertical="center"
        className="max-h-[120px] min-h-[42px] flex-1 rounded-2xl border-hairline border-line bg-canvas px-4 py-2.5 font-inter text-base leading-[22px] text-foreground"
      />
      <Pressable
        onPress={onSubmit}
        disabled={!canSubmit}
        hitSlop={6}
        accessibilityLabel="Ask"
        className={clsx(
          "h-[42px] w-[42px] items-center justify-center rounded-full bg-accent active:opacity-70",
          !canSubmit && "opacity-40",
        )}
      >
        <Ionicons name="arrow-up" size={20} color={foregroundInverse} />
      </Pressable>
    </View>
  );
};
