import { TINT_ALPHA } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { View } from "react-native";
import { AppText } from "./app-text";

interface Props {
  label: string;
  color: string;
  size?: number;
}

export const InitialAvatar = function ({ label, color, size = 36 }: Props) {
  const { scheme } = useThemeColors();

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: `${color}${TINT_ALPHA[scheme].holder}` }}
    >
      <AppText type="label" className="text-[13px]" style={{ color }}>
        {label[0]?.toUpperCase()}
      </AppText>
    </View>
  );
};
