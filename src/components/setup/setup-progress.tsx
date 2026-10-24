import { View } from "react-native";

interface Props {
  total: number;
  activeIndex: number;
}

export const SetupProgress = function ({ total, activeIndex }: Props) {
  return (
    <View className="flex-row gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={index <= activeIndex ? "h-1 flex-1 rounded-full bg-accent" : "h-1 flex-1 rounded-full bg-line"}
        />
      ))}
    </View>
  );
};
