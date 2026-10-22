import { clsx } from "clsx";
import { Platform, Text, type TextProps } from "react-native";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge so a passed className beats the type's own (clsx kept both), with the
// font-size/line-height conflict off: an arbitrary text-[15px] sets no line height here.
const mergeClasses = extendTailwindMerge({
  override: { conflictingClassGroups: { "font-size": [] } },
});

export interface AppTextProps extends TextProps {
  type?:
    | "default"
    | "display"
    | "title"
    | "subtitle"
    | "body"
    | "label"
    | "caption"
    | "link"
    | "code";
  className?: string;
}

export const AppText = function ({
  type = "default",
  className,
  ...rest
}: AppTextProps) {
  const styleGuide = {
    default: "text-[14px] leading-[21px] text-foreground font-inter",
    display:
      "text-[22px] leading-[28px] tracking-tight text-foreground font-inter-semibold",
    title:
      "text-[17px] leading-[22px] tracking-tight text-foreground font-inter-semibold",
    subtitle: "text-[13px] leading-[19px] text-foreground-muted font-inter",
    body: "text-[14px] leading-[21px] text-foreground font-inter",
    label: "text-[14px] leading-[20px] text-foreground font-inter-semibold",
    caption: "text-xs leading-[16px] text-foreground-subtle font-inter",
    link: "text-[13px] leading-[18px] text-accent font-inter-semibold",
    code: clsx(
      "text-xs",
      Platform.select({ android: "font-inter-bold" }) ?? "font-inter-medium",
    ),
  } as const;

  return <Text {...rest} className={mergeClasses(styleGuide[type], className)} />;
};
