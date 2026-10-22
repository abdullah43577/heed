import { Illustration } from "@/components/illustrations/illustration";
import type { IllustrationName } from "@/components/illustrations/illustration";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import { AppButton } from "./app-button";
import { AppText } from "./app-text";

interface Props {
  icon?: LucideIcon;
  illustration?: IllustrationName;
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export const EmptyState = function ({ icon: Icon, illustration, title, subtitle, buttonText, onButtonPress }: Props) {
  const { accent, accentMuted } = useThemeColors();

  return (
    <View className="flex-1 items-center justify-center px-9 py-16">
      {illustration ? (
        <View className="mb-5">
          <Illustration name={illustration} />
        </View>
      ) : (
        Icon && (
          <View
            className="mb-4 items-center justify-center rounded-full"
            style={{ width: 56, height: 56, backgroundColor: accentMuted }}
          >
            <Icon size={24} color={accent} strokeWidth={1.75} />
          </View>
        )
      )}

      <AppText type="label" className="text-center text-[16px] leading-[22px]">
        {title}
      </AppText>
      <AppText type="subtitle" className="mt-1.5 text-center">
        {subtitle}
      </AppText>

      {buttonText && onButtonPress && (
        <AppButton type="submit" label={buttonText} onPress={onButtonPress} className="mt-6 h-11 self-center px-5" />
      )}
    </View>
  );
};
