import { TextArea } from "@/components/primitives/text-area";
import { SettingsCard } from "@/components/profile/settings-card";
import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { MAX_INSTRUCTION_CHARS } from "@/constants/rules";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { MailAccount } from "../../../types/mail-account";

interface Props {
  account: MailAccount;
  onSave: (instruction: string | null) => void;
  isSaving: boolean;
}

export const InstructionCard = function ({ account, onSave, isSaving }: Props) {
  const [text, setText] = useState(account.instruction ?? "");
  const hydratedId = useRef(account.id);

  // A refetch after saving must not overwrite what is being typed, only a switch of account.
  useEffect(() => {
    if (hydratedId.current === account.id) return;
    hydratedId.current = account.id;
    setText(account.instruction ?? "");
  }, [account.id, account.instruction]);

  const isDirty = text.trim() !== (account.instruction ?? "");

  return (
    <SettingsCard title="Instructions for Heed">
      <View className="p-3.5">
        <AppText type="subtitle" className="mb-3">
          Tell Heed about this inbox in your own words. It uses this when sorting mail and drafting replies.
        </AppText>
        <TextArea
          placeholder="e.g. I'm a freelance designer. Recruiters get a polite no. Anything from my accountant matters."
          value={text}
          onChangeText={setText}
          maxLength={MAX_INSTRUCTION_CHARS}
          className="min-h-[110px]"
        />
        <AppText type="caption" className="mt-2 text-right">
          {text.length}/{MAX_INSTRUCTION_CHARS}
        </AppText>
        {isDirty && (
          <AppButton
            type="submit"
            label="Save"
            onPress={() => onSave(text.trim() || null)}
            isLoading={isSaving}
            className="mt-3 h-11"
          />
        )}
      </View>
    </SettingsCard>
  );
};
