import { StatTile } from "@/components/shared/stat-tile";
import { CheckCheck, CircleAlert, CircleHelp } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  readCount: number;
  leftCount: number;
  worthALookCount: number;
}

export const HandledSummary = function ({ readCount, leftCount, worthALookCount }: Props) {
  return (
    <View className="flex-row gap-2">
      <StatTile icon={CheckCheck} tint="NEEDS_REPLY" value={readCount} label="Read for you" />
      <StatTile icon={CircleAlert} tint="IMPORTANT" value={worthALookCount} label="Worth a look" />
      <StatTile icon={CircleHelp} tint="ROUTINE" value={leftCount} label="Left for you" />
    </View>
  );
};
