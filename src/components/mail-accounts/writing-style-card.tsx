import { TextArea } from "@/components/primitives/text-area";
import { SettingsCard } from "@/components/profile/settings-card";
import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { formatRelativeDate } from "@/utils/format-date";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { MailAccount } from "../../../types/mail-account";

interface Props {
  account: MailAccount;
  onLearn: () => void;
  onSave: (styleNote: string | null) => void;
  isLearning: boolean;
  isSaving: boolean;
  isEditing: boolean;
  onEditingChange: (editing: boolean) => void;
}

const MAX_NOTE_CHARS = 800;
const TEMPLATE = "Greeting: \nSign-off: \nLength: \nTone: \nLanguage: ";

export const WritingStyleCard = function ({
  account,
  onLearn,
  onSave,
  isLearning,
  isSaving,
  isEditing,
  onEditingChange,
}: Props) {
  const [draft, setDraft] = useState("");
  const canLearn = account.status === "ACTIVE";
  const busy = isLearning || isSaving;

  const handleStartEditing = function () {
    setDraft(account.styleNote ?? TEMPLATE);
    onEditingChange(true);
  };

  const source = account.styleLearnedAt
    ? `Learned from your sent mail ${formatRelativeDate(account.styleLearnedAt)}. Edit it if it's off.`
    : "Written by you.";

  return (
    <SettingsCard
      title="Writing style"
      {...(account.styleNote && !isEditing && { actionLabel: "Edit", onPressAction: handleStartEditing })}
    >
      <View className="p-3.5">
        {isEditing ? (
          <>
            <TextArea
              placeholder={TEMPLATE}
              value={draft}
              onChangeText={setDraft}
              maxLength={MAX_NOTE_CHARS}
              className="min-h-[140px]"
            />
            <AppText type="caption" className="mt-2">
              One line each for greeting, sign-off, length, tone, language and habits. Heed uses it for how drafts
              sound, never for what they say.
            </AppText>
            <View className="mt-4 flex-row gap-3">
              <AppButton
                type="secondary"
                label="Cancel"
                onPress={() => onEditingChange(false)}
                disabled={busy}
                className="h-11 flex-1"
              />
              <AppButton
                type="submit"
                label="Save"
                onPress={() => onSave(draft.trim() || null)}
                isLoading={isSaving}
                disabled={busy}
                className="h-11 flex-1"
              />
            </View>
            {account.styleNote && (
              <Pressable onPress={() => onSave(null)} disabled={busy} hitSlop={8} className="mt-4 self-center active:opacity-70">
                <AppText type="link" className="text-danger">
                  Clear the style note
                </AppText>
              </Pressable>
            )}
          </>
        ) : account.styleNote ? (
          <>
            <AppText type="body">{account.styleNote}</AppText>
            <AppText type="caption" className="mt-3">
              {source}
            </AppText>
            <AppButton
              type="secondary"
              label="Learn again from my sent mail"
              onPress={onLearn}
              isLoading={isLearning}
              disabled={busy || !canLearn}
              className="mt-4 h-11"
            />
          </>
        ) : (
          <>
            <AppText type="subtitle">
              {
                "Heed reads your recent sent mail from this account and writes a short note on how you greet, sign off and sound. Every draft follows it. Your emails aren't kept, only the note."
              }
            </AppText>
            <AppButton
              type="submit"
              label="Learn how I write"
              onPress={onLearn}
              isLoading={isLearning}
              disabled={busy || !canLearn}
              className="mt-4 h-11"
            />
            <Pressable onPress={handleStartEditing} disabled={busy} hitSlop={8} className="mt-4 self-center active:opacity-70">
              <AppText type="link">Write it myself</AppText>
            </Pressable>
          </>
        )}
      </View>
    </SettingsCard>
  );
};
