import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import { InitialAvatar } from "@/components/shared/initial-avatar";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { splitPlaceholders } from "@/utils/placeholders";
import { PenLine } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
  onPress: () => void;
  onDismiss: () => void;
  onDraft: () => void;
  onLongPress?: () => void;
  disabled: boolean;
}

const draftState = function (message: EmailMessage) {
  const status = message.draft?.status;
  if (status === "SCHEDULED" || status === "SENDING") return { label: "Sending…", danger: false };
  if (status === "FAILED") return { label: "Not sent. Open it to try again", danger: true };
  return null;
};

export const ReviewCard = function ({ message, onPress, onDismiss, onDraft, onLongPress, disabled }: Props) {
  const { categoryTint } = useThemeColors();
  const highlight = categoryTint("IMPORTANT");
  const sender = message.fromName ?? message.fromEmail;
  const state = draftState(message);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={350}
      className="gap-2.5 rounded-xl border-hairline border-line bg-surface p-3.5 active:opacity-70"
    >
      <View className="flex-row items-center gap-2.5">
        <InitialAvatar label={sender} color={accountColor(message.mailAccount.email)} />
        <View className="flex-1">
          <View className="flex-row items-baseline gap-2">
            <AppText type="label" numberOfLines={1} className="flex-1">
              {sender}
            </AppText>
            <AppText type="caption">{formatRelativeDate(message.receivedAt).replace(/ ago$/, "")}</AppText>
          </View>
          <AppText type="subtitle" numberOfLines={1}>
            {message.subject}
          </AppText>
        </View>
      </View>

      {message.summary && (
        <AppText type="subtitle" numberOfLines={2}>
          {message.summary}
        </AppText>
      )}

      {message.draft && (
        <View className="gap-1.5 rounded-lg bg-surface-muted px-3 py-2.5">
          <Eyebrow icon={PenLine} label="Heed's draft" />
          <AppText type="subtitle" numberOfLines={3} className="text-foreground">
            {splitPlaceholders(message.draft.body).map((segment, index) =>
              segment.isPlaceholder ? (
                <Text key={index} style={{ color: highlight.color, backgroundColor: highlight.holder }}>
                  {segment.text}
                </Text>
              ) : (
                <Text key={index}>{segment.text}</Text>
              ),
            )}
          </AppText>
        </View>
      )}

      {state ? (
        <AppText type="subtitle" className={state.danger ? "text-danger" : ""}>
          {state.label}
        </AppText>
      ) : (
        <View className="flex-row items-center justify-end gap-2">
          <AppButton type="ghost" label="No reply needed" onPress={onDismiss} disabled={disabled} className="h-9 px-3" />
          <AppButton
            type="submit"
            label={message.draft ? "Review" : "Draft a reply"}
            onPress={message.draft ? onPress : onDraft}
            disabled={disabled}
            className="h-9 px-4"
          />
        </View>
      )}
    </Pressable>
  );
};
