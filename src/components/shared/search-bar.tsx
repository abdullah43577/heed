import { useThemeColors } from "@/hooks/use-theme-colors";
import { CircleX, Search } from "lucide-react-native";
import { Pressable, TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
}

export const SearchBar = function ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search...",
  autoFocus = false,
  onSubmitEditing,
}: Props) {
  const { foregroundSubtle } = useThemeColors();

  return (
    <View className="h-11 flex-row items-center gap-2 rounded-lg border-hairline border-line bg-canvas px-3">
      <Search size={18} color={foregroundSubtle} strokeWidth={1.75} />

      <TextInput
        className="flex-1 font-inter text-[15px] text-foreground"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        placeholderTextColor={foregroundSubtle}
        returnKeyType={onSubmitEditing ? "search" : undefined}
        onSubmitEditing={onSubmitEditing}
      />

      {value.length > 0 && (
        <Pressable onPress={onClear} hitSlop={8}>
          <CircleX size={18} color={foregroundSubtle} strokeWidth={1.75} />
        </Pressable>
      )}
    </View>
  );
};
