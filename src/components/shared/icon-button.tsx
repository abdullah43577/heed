import { useThemeColors } from "@/hooks/use-theme-colors";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

interface Props {
  icon: LucideIcon;
  onPress: () => void;
  color?: string;
  size?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

export const IconButton = function ({
  icon: Icon,
  onPress,
  color,
  size = 20,
  disabled = false,
  accessibilityLabel,
  className,
}: Props) {
  const { foreground } = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={clsx(
        "h-10 w-10 items-center justify-center rounded-full active:bg-surface-muted",
        disabled && "opacity-40",
        className,
      )}
    >
      <Icon size={size} color={color ?? foreground} strokeWidth={1.75} />
    </Pressable>
  );
};
