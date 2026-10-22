import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { findPlaceholders, splitPlaceholders } from "@/utils/placeholders";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
  editable: boolean;
}

// Styled children instead of `value` is how a TextInput shows highlighted runs inside editable text.
export const DraftBodyInput = function ({ value, onChange, editable }: Props) {
  const inputRef = useRef<TextInput>(null);
  const [selection, setSelection] = useState<{ start: number; end: number } | undefined>(undefined);
  const { categoryTint, foregroundSubtle } = useThemeColors();
  const highlight = categoryTint("IMPORTANT");
  const placeholders = findPlaceholders(value);

  const handleJumpTo = function (placeholder: string) {
    const start = value.indexOf(placeholder);
    if (start < 0) return;
    setSelection({ start, end: start + placeholder.length });
    inputRef.current?.focus();
  };

  return (
    <View>
      <View className="rounded-xl border-hairline border-line bg-surface">
        <TextInput
          ref={inputRef}
          multiline
          editable={editable}
          onChangeText={onChange}
          selection={selection}
          onSelectionChange={() => setSelection(undefined)}
          placeholder="Write your reply"
          placeholderTextColor={foregroundSubtle}
          textAlignVertical="top"
          className="min-h-[200px] px-3.5 py-3 font-inter text-[15px] leading-[22px] text-foreground"
        >
          {splitPlaceholders(value).map((segment, index) =>
            segment.isPlaceholder ? (
              <Text key={index} style={{ color: highlight.color, backgroundColor: highlight.holder }}>
                {segment.text}
              </Text>
            ) : (
              <Text key={index}>{segment.text}</Text>
            ),
          )}
        </TextInput>
      </View>

      {placeholders.length > 0 && (
        <View className="mt-3">
          <AppText type="caption" className="mb-2">
            Fill in {placeholders.length === 1 ? "this" : `these ${placeholders.length}`} before sending. Only you
            know them.
          </AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            {placeholders.map((placeholder) => (
              <Pressable
                key={placeholder}
                onPress={() => handleJumpTo(placeholder)}
                className="rounded-full px-3 py-1.5 active:opacity-70"
                style={{ backgroundColor: highlight.holder }}
              >
                <AppText type="caption" className="font-inter-medium" style={{ color: highlight.color }}>
                  {placeholder}
                </AppText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
