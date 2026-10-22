import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";
import { AskCitation, AskMessage } from "../../../types/ask";
import { AskAnswerText } from "./ask-answer-text";
import { AskSourceRow } from "./ask-source-row";

interface Props {
  message: AskMessage;
  onPressCitation: (citation: AskCitation) => void;
}

export const AskAnswer = function ({ message, onPressCitation }: Props) {
  const citations = message.citations ?? [];
  const showAccount = new Set(citations.map((citation) => citation.mailAccountId)).size > 1;

  return (
    <View>
      <AskAnswerText text={message.content} />

      {citations.length > 0 && (
        <View className="mt-4">
          <AppText type="caption" className="mb-2">
            From your mail
          </AppText>
          <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
            {citations.map((citation, index) => (
              <View key={`${citation.mailAccountId}:${citation.gmailMessageId}`}>
                {index > 0 && <View className="ml-14 h-px bg-line" />}
                <AskSourceRow
                  citation={citation}
                  showAccount={showAccount}
                  onPress={() => onPressCitation(citation)}
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
