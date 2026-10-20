import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";
import { SenderRule } from "../../../types/sender-rule";
import { RuleRow } from "./rule-row";

interface Props {
  rules: SenderRule[];
  onDelete: (rule: SenderRule) => void;
  disabled: boolean;
}

export const RuleList = function ({ rules, onDelete, disabled }: Props) {
  if (rules.length === 0) {
    return (
      <AppText type="subtitle" className="px-5 pb-5 pt-3">
        No rules yet. Add one here, or long-press a sender in Handled or Review.
      </AppText>
    );
  }

  return (
    <View className="pb-1 pt-2">
      {rules.map((rule, index) => (
        <View key={rule.id}>
          {index > 0 && <View className="ml-16 h-px bg-line" />}
          <RuleRow rule={rule} onDelete={() => onDelete(rule)} disabled={disabled} />
        </View>
      ))}
    </View>
  );
};
