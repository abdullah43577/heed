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
      <AppText type="subtitle" className="p-3.5">
        No rules yet. Add one here, or long-press a sender in Handled or Review.
      </AppText>
    );
  }

  return (
    <View>
      {rules.map((rule, index) => (
        <View key={rule.id}>
          {index > 0 && <View className="ml-[62px] h-px bg-line" />}
          <RuleRow rule={rule} onDelete={() => onDelete(rule)} disabled={disabled} />
        </View>
      ))}
    </View>
  );
};
