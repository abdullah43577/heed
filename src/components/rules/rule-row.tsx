import { AppText } from "@/components/shared/app-text";
import { RULE_KIND_META } from "@/constants/rules";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { IconTile } from "@/components/shared/icon-tile";
import { X } from "lucide-react-native";
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
    <View className="flex-row items-center gap-3 px-3.5 py-3">
      <IconTile icon={meta.icon} color={color} background={holder} />

      <View className="flex-1">
        <AppText type="body" numberOfLines={1} className="font-inter-medium">
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
        <X size={16} color={foregroundSubtle} strokeWidth={1.75} />
      </Pressable>
    </View>
  );
};
