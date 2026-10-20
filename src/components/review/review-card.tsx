import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { accountColor } from "@/utils/account-color";
import { formatRelativeDate } from "@/utils/format-date";
import { Pressable, View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
  onPress: () => void;
  onDismiss: () => void;
  onDraft: () => void;
  disabled: boolean;
}

const draftState = function (message: EmailMessage) {
  const status = message.draft?.status;
  if (status === "SCHEDULED" || status === "SENDING") return { label: "Sending…", danger: false };
  if (status === "FAILED") return { label: "Not sent. Open it to try again", danger: true };
  return null;
};

export const ReviewCard = function ({ message, onPress, onDismiss, onDraft, disabled }: Props) {
  const color = accountColor(message.mailAccount.email);
  const sender = message.fromName ?? message.fromEmail;
  const state = draftState(message);

  return (
    <Pressable onPress={onPress} className="rounded-3xl border-hairline border-line bg-surface p-5 active:opacity-70">
      <View className="flex-row items-center gap-3">
        <View
          className="items-center justify-center rounded-full"
          style={{ width: 36, height: 36, backgroundColor: `${color}1F` }}
        >
          <AppText type="label" style={{ color }}>
            {sender[0]?.toUpperCase()}
          </AppText>
        </View>

        <View className="flex-1">
          <AppText type="label" numberOfLines={1}>
            {sender}
          </AppText>
          <AppText type="caption" numberOfLines={1}>
            Waiting {formatRelativeDate(message.receivedAt).replace(/ ago$/, "")} · {message.mailAccount.email}
          </AppText>
        </View>
      </View>

      <AppText type="label" className="mt-4 text-[15px] leading-[20px]" numberOfLines={2}>
        {message.subject}
      </AppText>

      {message.summary && (
        <AppText type="subtitle" className="mt-1" numberOfLines={3}>
          {message.summary}
        </AppText>
      )}

      {message.draft && (
        <View className="mt-4 rounded-2xl bg-surface-muted px-4 py-3">
          <AppText type="caption" className="mb-1">
            {"Heed's draft"}
          </AppText>
          <AppText type="default" numberOfLines={3}>
            {message.draft.body}
          </AppText>
        </View>
      )}

      {state && (
        <AppText type="caption" className={state.danger ? "mt-3 text-danger" : "mt-3"}>
          {state.label}
        </AppText>
      )}

      {!state && (
        <View className="mt-4 flex-row gap-3">
          <AppButton type="secondary" label="No reply needed" onPress={onDismiss} disabled={disabled} className="h-11 flex-1" />
          {message.draft ? (
            <AppButton type="submit" label="Review" onPress={onPress} disabled={disabled} className="h-11 flex-1" />
          ) : (
            <AppButton type="submit" label="Draft a reply" onPress={onDraft} disabled={disabled} className="h-11 flex-1" />
          )}
        </View>
      )}
    </Pressable>
  );
};
