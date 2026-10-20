import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { Pressable, View } from "react-native";

interface Props {
  mode: "edit" | "countdown" | "sending";
  secondsLeft: number;
  canSend: boolean;
  blockedReason: string | null;
  onSend: () => void;
  onUndo: () => void;
  onDismiss: () => void;
  isBusy: boolean;
}

export const DraftSendBar = function ({ mode, secondsLeft, canSend, blockedReason, onSend, onUndo, onDismiss, isBusy }: Props) {
  if (mode !== "edit") {
    return (
      <View className="flex-row items-center gap-3 border-t-hairline border-line bg-surface px-5 py-4">
        <AppText type="label" className="flex-1">
          {mode === "countdown" ? `Sending in ${secondsLeft}…` : "Sending…"}
        </AppText>
        {mode === "countdown" && (
          <Pressable onPress={onUndo} disabled={isBusy} hitSlop={10} className="active:opacity-70">
            <AppText type="link" className="text-base">
              Undo
            </AppText>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View className="border-t-hairline border-line bg-surface px-5 pb-4 pt-3">
      {blockedReason && (
        <AppText type="caption" className="mb-2 text-center">
          {blockedReason}
        </AppText>
      )}
      <View className="flex-row gap-3">
        <AppButton type="secondary" label="No reply needed" onPress={onDismiss} disabled={isBusy} className="h-12 flex-1" />
        <AppButton type="submit" label="Send" onPress={onSend} disabled={!canSend || isBusy} className="h-12 flex-1" />
      </View>
    </View>
  );
};
