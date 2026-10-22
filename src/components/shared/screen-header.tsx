import { ChevronLeft } from "lucide-react-native";
import { ReactNode } from "react";
import { View } from "react-native";
import { AppText } from "./app-text";
import { IconButton } from "./icon-button";

interface Props {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}

export const ScreenHeader = function ({ title, onBack, right }: Props) {
  return (
    <View
      className={
        onBack
          ? "h-14 flex-row items-center gap-1 border-b-hairline border-line bg-canvas pl-2 pr-3"
          : "h-14 flex-row items-center gap-1 border-b-hairline border-line bg-canvas pl-5 pr-3"
      }
    >
      {onBack && <IconButton icon={ChevronLeft} size={22} onPress={onBack} accessibilityLabel="Back" />}

      <AppText type="title" numberOfLines={1} className="flex-1">
        {title}
      </AppText>

      {right && <View className="flex-row items-center">{right}</View>}
    </View>
  );
};
