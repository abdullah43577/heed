import { useThemeColors } from "@/hooks/use-theme-colors";
import { useMemo } from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { SPOTS, type IllustrationName } from "./spots";

export type { IllustrationName };

interface Props {
  name: IllustrationName;
  size?: number;
}

export const Illustration = function ({ name, size = 176 }: Props) {
  const { foreground, foregroundSubtle, surface, accent, accentMuted, categoryTint } = useThemeColors();
  const warn = categoryTint("IMPORTANT");

  const xml = useMemo(
    () =>
      SPOTS[name]
        .replaceAll("{{fg}}", foreground)
        .replaceAll("{{subtle}}", foregroundSubtle)
        .replaceAll("{{surface}}", surface)
        .replaceAll("{{accent}}", accent)
        .replaceAll("{{tint}}", accentMuted)
        .replaceAll("{{warnTint}}", warn.holder)
        .replaceAll("{{warn}}", warn.color),
    [name, foreground, foregroundSubtle, surface, accent, accentMuted, warn.holder, warn.color],
  );

  return (
    <View
      style={{ width: size, height: (size * 3) / 4 }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <SvgXml xml={xml} width={size} height={(size * 3) / 4} />
    </View>
  );
};
