import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { CircleCheck } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  label: string;
  className?: string;
}

export const SetupDoneLine = function ({ label, className }: Props) {
  const { accent } = useThemeColors();

  return (
    <View className={`flex-row items-center gap-2 ${className ?? ""}`}>
      <CircleCheck size={18} color={accent} strokeWidth={2} />
      <AppText type="label" className="flex-1 text-accent">
        {label}
      </AppText>
    </View>
  );
};
