import { clsx } from "clsx";
import { Pressable, View } from "react-native";
import { AppText } from "./app-text";

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value: T | null | undefined;
  onChange: (value: T) => void;
  disabled?: boolean;
}

export const SegmentedControl = function <T extends string>({
  options,
  value,
  onChange,
  disabled,
}: SegmentedControlProps<T>) {
  return (
    <View className="flex-row rounded-lg bg-surface-muted p-0.5">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            disabled={disabled}
            onPress={() => onChange(option.value)}
            className={clsx(
              "flex-1 items-center rounded-md border py-2",
              isActive ? "border-line bg-surface" : "border-transparent",
              disabled && "opacity-50",
            )}
          >
            <AppText
              type="default"
              className={
                isActive
                  ? "text-[13px] font-inter-semibold text-foreground"
                  : "text-[13px] font-inter-medium text-foreground-subtle"
              }
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};
