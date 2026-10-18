import { View } from "react-native";
import { EmailMessage } from "../../../types/email-message";
import { IncomingRow } from "./incoming-row";

interface Props {
  messages: EmailMessage[];
}

export const IncomingList = function ({ messages }: Props) {
  return (
    <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
      {messages.map((message, index) => (
        <View key={message.id}>
          {index > 0 && <View className="ml-16 h-px bg-line" />}
          <IncomingRow message={message} />
        </View>
      ))}
    </View>
  );
};
