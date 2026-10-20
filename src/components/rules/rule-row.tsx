import { AppText } from "@/components/shared/app-text";
import { RULE_KIND_META } from "@/constants/rules";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { SenderRule } from "../../../types/sender-rule";

interface Props {
  rule: SenderRule;
  onDelete: () => void;
  disabled: boolean;
}

export const RuleRow = function ({ rule, onDelete, disabled }: Props) {
  const { categoryTint, foregroundSubtle } = useThemeColors();
  const meta = RULE_KIND_META[rule.kind];
  const { color, holder } = categoryTint(meta.tint);

  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <View
        className="items-center justify-center rounded-squircle"
        style={{ width: 38, height: 38, backgroundColor: holder }}
      >
        <Ionicons name={meta.icon} size={18} color={color} />
      </View>

      <View className="flex-1">
        <AppText type="label" numberOfLines={1}>
          {rule.pattern}
        </AppText>
        <AppText type="caption" numberOfLines={1} className="mt-0.5">
          {meta.label}
          {rule.mailAccountId ? "" : " · all accounts"}
        </AppText>
      </View>

      <Pressable
        onPress={onDelete}
        disabled={disabled}
        hitSlop={10}
        className="h-8 w-8 items-center justify-center rounded-full active:bg-surface-muted"
      >
        <Ionicons name="close" size={15} color={foregroundSubtle} />
      </Pressable>
    </View>
  );
};
