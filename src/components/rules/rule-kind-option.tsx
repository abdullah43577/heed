import { AppText } from "@/components/shared/app-text";
import { RULE_KIND_META } from "@/constants/rules";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { Pressable, View } from "react-native";
import { SenderRuleKind } from "../../../types/sender-rule";

interface Props {
  kind: SenderRuleKind;
  selected: boolean;
  onPress: () => void;
}

export const RuleKindOption = function ({ kind, selected, onPress }: Props) {
  const { accent, foregroundSubtle } = useThemeColors();
  const meta = RULE_KIND_META[kind];

  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "flex-row items-center gap-3 rounded-2xl border-hairline px-4 py-3 active:bg-surface-muted",
        selected ? "border-accent bg-surface" : "border-line bg-surface",
      )}
    >
      <View className="flex-1">
        <AppText type="label">{meta.label}</AppText>
        <AppText type="caption" className="mt-0.5">
          {meta.description}
        </AppText>
      </View>
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={20}
        color={selected ? accent : foregroundSubtle}
      />
    </Pressable>
  );
};
