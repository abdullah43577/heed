import { Input } from "@/components/primitives/input";
import { AppButton } from "@/components/shared/app-button";
import { AppModal } from "@/components/shared/app-modal";
import { AppText } from "@/components/shared/app-text";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { RULE_KINDS, SENDER_PATTERN } from "@/constants/rules";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { CreateSenderRuleRequest, SenderRuleKind } from "../../../types/sender-rule";
import { RuleKindOption } from "./rule-kind-option";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (rule: CreateSenderRuleRequest) => void;
  isSaving: boolean;
  mailAccountId: string;
  accountEmail: string;
  // From a long-press: the sender is known, so the choice is just the address or its whole domain.
  senderEmail?: string;
  defaultAllAccounts?: boolean;
}

const domainOf = (email: string) => `@${email.split("@")[1] ?? ""}`;

export const RuleEditorSheet = function ({
  visible,
  onClose,
  onSave,
  isSaving,
  mailAccountId,
  accountEmail,
  senderEmail,
  defaultAllAccounts = false,
}: Props) {
  const [typedPattern, setTypedPattern] = useState("");
  const [matchDomain, setMatchDomain] = useState(false);
  const [kind, setKind] = useState<SenderRuleKind>("ALWAYS_LEAVE");
  const [allAccounts, setAllAccounts] = useState(defaultAllAccounts);

  useEffect(() => {
    if (!visible) return;
    setTypedPattern("");
    setMatchDomain(false);
    setKind("ALWAYS_LEAVE");
    setAllAccounts(defaultAllAccounts);
  }, [visible, senderEmail, defaultAllAccounts]);

  const pattern = (senderEmail ? (matchDomain ? domainOf(senderEmail) : senderEmail) : typedPattern).trim().toLowerCase();
  const isValid = SENDER_PATTERN.test(pattern);

  const handleSave = function () {
    if (!isValid) return;
    onSave({ pattern, kind, mailAccountId: allAccounts ? null : mailAccountId });
  };

  return (
    <AppModal isVisible={visible} onClose={onClose} variant="bottom-sheet" showHandle scrollable title="Sender rule">
      <View className="gap-5 px-5 pb-6">
        {senderEmail ? (
          <View className="gap-2">
            <SegmentedControl
              options={[
                { label: "This address", value: "address" },
                { label: `Everyone at ${domainOf(senderEmail)}`, value: "domain" },
              ]}
              value={matchDomain ? "domain" : "address"}
              onChange={(value) => setMatchDomain(value === "domain")}
            />
            <AppText type="caption" className="px-1">
              {pattern}
            </AppText>
          </View>
        ) : (
          <View className="gap-1.5">
            <Input
              value={typedPattern}
              onChangeText={setTypedPattern}
              placeholder="name@example.com or @example.com"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <AppText type="caption" className="px-1">
              An address, or @domain for everyone there.
            </AppText>
          </View>
        )}

        <View className="gap-2">
          {RULE_KINDS.map((option) => (
            <RuleKindOption key={option} kind={option} selected={kind === option} onPress={() => setKind(option)} />
          ))}
        </View>

        <View className="flex-row items-center gap-3">
          <View className="flex-1">
            <AppText type="default">All my accounts</AppText>
            <AppText type="caption" className="mt-0.5">
              {allAccounts ? "Applies to every connected Gmail" : `Only ${accountEmail}`}
            </AppText>
          </View>
          <ToggleSwitch value={allAccounts} onValueChange={setAllAccounts} />
        </View>

        <AppButton type="submit" label="Save rule" onPress={handleSave} isLoading={isSaving} disabled={!isValid} />
      </View>
    </AppModal>
  );
};
