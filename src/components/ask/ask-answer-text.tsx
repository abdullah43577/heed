import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { splitCitationMarkers } from "@/utils/citation-markers";
import { Text } from "react-native";

interface Props {
  text: string;
  isStreaming?: boolean;
}

export const AskAnswerText = function ({ text, isStreaming = false }: Props) {
  const { accent, accentMuted } = useThemeColors();

  return (
    <AppText type="body" selectable>
      {splitCitationMarkers(text).map((segment, index) =>
        segment.isMarker ? (
          <Text key={index}>
            {" "}
            <Text className="font-inter-bold text-[11px]" style={{ color: accent, backgroundColor: accentMuted }}>
              {` ${segment.text} `}
            </Text>
          </Text>
        ) : (
          <Text key={index}>{segment.text}</Text>
        ),
      )}
      {isStreaming && <Text style={{ color: accent }}>▍</Text>}
    </AppText>
  );
};
