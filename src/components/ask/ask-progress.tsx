import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ActivityIndicator, View } from "react-native";
import { AskStatus } from "../../../types/ask";
import { AskAnswerText } from "./ask-answer-text";

interface Props {
  status: AskStatus | null;
  text: string;
}

const statusLabel = function (status: AskStatus | null) {
  if (status?.stage !== "reading") return "Searching your mail…";
  if (status.count === 0) return "Nothing matched";
  return `Reading ${status.count} ${status.count === 1 ? "email" : "emails"}…`;
};

export const AskProgress = function ({ status, text }: Props) {
  const { accent } = useThemeColors();

  if (text) return <AskAnswerText text={text} isStreaming />;

  return (
    <View className="flex-row items-center gap-2.5">
      <ActivityIndicator size="small" color={accent} />
      <AppText type="subtitle">{statusLabel(status)}</AppText>
    </View>
  );
};
