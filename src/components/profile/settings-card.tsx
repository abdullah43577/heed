import { SectionHeader } from "@/components/shared/section-header";
import { clsx } from "clsx";
import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  title?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  children: ReactNode;
  className?: string;
}

export const SettingsCard = function ({ title, actionLabel, onPressAction, children, className }: Props) {
  return (
    <View className={className}>
      {title && (
        <SectionHeader title={title} {...(actionLabel && onPressAction && { actionLabel, onPressAction })} />
      )}

      <View className={clsx("overflow-hidden rounded-xl border-hairline border-line bg-surface")}>
        {/* Tucks the first row's divider under the card's own top border. */}
        <View style={{ marginTop: -1 }}>{children}</View>
      </View>
    </View>
  );
};
