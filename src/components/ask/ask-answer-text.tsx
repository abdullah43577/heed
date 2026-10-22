import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { splitCitationMarkers } from "@/utils/citation-markers";
import { Text } from "react-native";

interface Props {
  text: string;
  isStreaming?: boolean;
}

export const AskAnswerText = function ({ text, isStreaming = false }: Props) {
  const { accent } = useThemeColors();

  return (
    <AppText type="body" selectable>
      {splitCitationMarkers(text).map((segment, index) =>
        segment.isMarker ? (
          <Text key={index} className="font-inter-semibold text-xs" style={{ color: accent }}>
            {` ${segment.text}`}
          </Text>
        ) : (
          <Text key={index}>{segment.text}</Text>
        ),
      )}
      {isStreaming && <Text style={{ color: accent }}>▍</Text>}
    </AppText>
  );
};
