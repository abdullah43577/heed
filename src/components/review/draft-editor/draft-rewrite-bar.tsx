import { TextArea } from "@/components/primitives/text-area";
import { AppButton } from "@/components/shared/app-button";
import { AppModal } from "@/components/shared/app-modal";
import { AppText } from "@/components/shared/app-text";
import { REWRITE_PRESETS } from "@/constants/drafts";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { RewritePreset } from "../../../../types/draft";

interface Props {
  onPreset: (preset: RewritePreset) => void;
  onInstruction: (instruction: string) => void;
  disabled: boolean;
}

const Chip = function ({ label, onPress, disabled }: { label: string; onPress: () => void; disabled: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="rounded-full border-hairline border-line bg-surface px-3.5 py-2 active:bg-surface-muted"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <AppText type="caption" className="font-inter-medium text-foreground">
        {label}
      </AppText>
    </Pressable>
  );
};

export const DraftRewriteBar = function ({ onPreset, onInstruction, disabled }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [instruction, setInstruction] = useState("");

  const handleSubmit = function () {
    const trimmed = instruction.trim();
    if (trimmed.length < 2) return;
    setModalVisible(false);
    setInstruction("");
    onInstruction(trimmed);
  };

  return (
    <View>
      <AppText type="caption" className="mb-2">
        Rewrite
      </AppText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {REWRITE_PRESETS.map((preset) => (
          <Chip key={preset.value} label={preset.label} onPress={() => onPreset(preset.value)} disabled={disabled} />
        ))}
        <Chip label="Something else…" onPress={() => setModalVisible(true)} disabled={disabled} />
      </ScrollView>

      <AppModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        variant="bottom-sheet"
        showHandle
        title="How should Heed change it?"
      >
        <View className="gap-4 px-5 pb-6">
          <TextArea
            placeholder="e.g. Say I'm away until Monday and suggest a call"
            value={instruction}
            onChangeText={setInstruction}
            maxLength={200}
          />
          <AppButton type="submit" label="Rewrite" onPress={handleSubmit} disabled={instruction.trim().length < 2} />
        </View>
      </AppModal>
    </View>
  );
};
