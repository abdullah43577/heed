import { MessageRow } from "@/components/messages/message-row";
import { AppText } from "@/components/shared/app-text";
import { SectionHeader } from "@/components/shared/section-header";
import { View } from "react-native";
import { EmailMessage } from "../../../types/email-message";

interface Props {
  title: string;
  caption: string;
  messages: EmailMessage[];
  onPressMessage: (message: EmailMessage) => void;
}

export const BacklogMessageSection = function ({ title, caption, messages, onPressMessage }: Props) {
  if (messages.length === 0) return null;

  return (
    <View>
      <SectionHeader title={`${title} · ${messages.length}`} className="mb-1" />
      <AppText type="caption" className="mb-3">
        {caption}
      </AppText>

      <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
        {messages.map((message, index) => (
          <View key={message.id}>
            {index > 0 && <View className="ml-16 h-px bg-line" />}
            <MessageRow message={message} onPress={() => onPressMessage(message)} />
          </View>
        ))}
      </View>
    </View>
  );
};
