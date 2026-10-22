import { AppText } from "@/components/shared/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { clsx } from "clsx";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";

interface Props {
  label: string;
  icon?: LucideIcon;
  value?: string;
  right?: ReactNode;
  onPress?: () => void;
  destructive?: boolean;
  withDivider?: boolean;
}

export const SettingsRow = function ({
  label,
  icon: Icon,
  value,
  right,
  onPress,
  destructive = false,
  withDivider = false,
}: Props) {
  const { foreground, foregroundSubtle, danger } = useThemeColors();

  const content = (
    <>
      {Icon && (
        <View className="h-8 w-8 items-center justify-center rounded-lg bg-surface-muted">
          <Icon size={18} color={destructive ? danger : foreground} strokeWidth={1.75} />
        </View>
      )}

      <AppText
        type="body"
        className={clsx("flex-1 font-inter-medium", destructive && "text-danger", destructive && !Icon && "text-center")}
      >
        {label}
      </AppText>

      {right ??
        (value !== undefined && (
          <AppText type="subtitle" numberOfLines={1}>
            {value}
          </AppText>
        ))}

      {onPress && !destructive && <ChevronRight size={18} color={foregroundSubtle} strokeWidth={1.75} />}
    </>
  );

  const className = clsx(
    "min-h-[52px] flex-row items-center gap-3 px-3.5 py-2.5",
    withDivider && "border-t-hairline border-line",
    onPress && "active:bg-surface-muted",
  );

  if (onPress) {
    return (
      <Pressable className={className} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return <View className={className}>{content}</View>;
};
