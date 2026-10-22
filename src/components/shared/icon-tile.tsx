import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  icon: LucideIcon;
  color: string;
  background: string;
  size?: number;
}

// Sized in style, not w-*/h-*: a column parent would stretch it (§5).
export const IconTile = function ({ icon: Icon, color, background, size = 36 }: Props) {
  return (
    <View className="items-center justify-center rounded-full" style={{ width: size, height: size, backgroundColor: background }}>
      <Icon size={Math.round(size / 2)} color={color} strokeWidth={1.75} />
    </View>
  );
};
