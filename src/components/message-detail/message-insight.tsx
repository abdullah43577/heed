import { AppText } from "@/components/shared/app-text";
import { SectionHeader } from "@/components/shared/section-header";
import { View } from "react-native";
import { EmailMessage, TriageSource } from "../../../types/email-message";

interface Props {
  message: EmailMessage;
}

const SOURCE_LABEL: Record<TriageSource, string> = {
  AI: "Heed read it",
  HEADER: "Sorted by Gmail's own tabs",
  RULE: "Your rule",
  FALLBACK: "Heed couldn't decide",
};

export const MessageInsight = function ({ message }: Props) {
  if (!message.summary && !message.reason) return null;

  return (
    <View>
      <SectionHeader title="Heed's read" />

      <View className="rounded-2xl border-hairline border-line bg-surface p-4">
        {message.summary && <AppText type="body">{message.summary}</AppText>}

        {message.reason && (
          <AppText type="caption" className={message.summary ? "mt-3" : ""}>
            {message.decidedBy ? `${SOURCE_LABEL[message.decidedBy]} · ` : ""}
            {message.reason}
          </AppText>
        )}
      </View>
    </View>
  );
};
