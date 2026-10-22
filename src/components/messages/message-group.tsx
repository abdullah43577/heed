import { EmailCategory } from "@/constants/categories";
import { View } from "react-native";
import { EmailMessage } from "../../../types/email-message";
import { CategoryHeader } from "./category-header";
import { MessageRow } from "./message-row";

interface Props {
  category: EmailCategory;
  messages: EmailMessage[];
  onPressMessage: (message: EmailMessage) => void;
  onLongPressMessage?: (message: EmailMessage) => void;
}

export const MessageGroup = function ({ category, messages, onPressMessage, onLongPressMessage }: Props) {
  return (
    <View>
      <CategoryHeader category={category} count={messages.length} />

      <View className="overflow-hidden rounded-xl border-hairline border-line bg-surface">
        {messages.map((message, index) => (
          <View key={message.id}>
            {index > 0 && <View className="ml-[62px] h-px bg-line" />}
            <MessageRow
              message={message}
              onPress={() => onPressMessage(message)}
              {...(onLongPressMessage && { onLongPress: () => onLongPressMessage(message) })}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
