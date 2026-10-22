import { AppText } from "@/components/shared/app-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Sparkles } from "lucide-react-native";
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
    <View className="gap-2.5 rounded-xl border-hairline border-line bg-surface p-3.5">
      <Eyebrow icon={Sparkles} label="Heed's read" />

      {message.summary && <AppText type="body">{message.summary}</AppText>}

      {message.reason && (
        <AppText type="subtitle" className={message.summary ? "border-t-hairline border-line pt-2.5" : ""}>
          {message.decidedBy ? `${SOURCE_LABEL[message.decidedBy]} · ` : ""}
          {message.reason}
        </AppText>
      )}
    </View>
  );
};
