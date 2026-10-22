import { useThemeColors } from "@/hooks/use-theme-colors";
import { clsx } from "clsx";
import { useState } from "react";
import { TextInput, type TextInputProps } from "react-native";

export interface TextAreaProps extends TextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  className?: string;
}

export const TextArea = function ({ placeholder, onChangeText, className, onFocus, onBlur, ...rest }: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { foregroundSubtle } = useThemeColors();

  return (
    <TextInput
      {...rest}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      className={clsx(
        "w-full rounded-lg border bg-canvas px-4 py-3 font-inter text-[15px] leading-[22px] text-foreground",
        isFocused ? "border-accent" : "border-line",
        className,
      )}
      placeholderTextColor={foregroundSubtle}
      placeholder={placeholder}
      onChangeText={onChangeText}
      textAlignVertical="top"
      multiline
      numberOfLines={4}
    />
  );
};
