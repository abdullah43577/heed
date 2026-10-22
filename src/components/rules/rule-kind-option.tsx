import { AppText } from "@/components/shared/app-text";
import { RULE_KIND_META } from "@/constants/rules";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { clsx } from "clsx";
import { Circle, CircleDot } from "lucide-react-native";
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
        "flex-row items-center gap-3 rounded-lg border-hairline px-3.5 py-3 active:bg-surface-muted",
        selected ? "border-accent bg-accent-muted" : "border-line bg-surface",
      )}
    >
      <View className="flex-1">
        <AppText type="label">{meta.label}</AppText>
        <AppText type="caption" className="mt-0.5">
          {meta.description}
        </AppText>
      </View>
      {selected ? (
        <CircleDot size={20} color={accent} strokeWidth={2} />
      ) : (
        <Circle size={20} color={foregroundSubtle} strokeWidth={1.75} />
      )}
    </Pressable>
  );
};
