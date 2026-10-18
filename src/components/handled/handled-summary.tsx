import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";

interface Props {
  readCount: number;
  leftCount: number;
  worthALookCount: number;
}

export const HandledSummary = function ({ readCount, leftCount, worthALookCount }: Props) {
  const details = [
    worthALookCount > 0 && `${worthALookCount} worth a look`,
    leftCount > 0 && `${leftCount} left for you`,
  ].filter(Boolean);

  return (
    <View className="rounded-3xl border-hairline border-line bg-surface p-5">
      <AppText type="display">{readCount}</AppText>
      <AppText type="subtitle" className="mt-0.5">
        {readCount === 1 ? "email read for you today" : "emails read for you today"}
      </AppText>

      {details.length > 0 && (
        <AppText type="caption" className="mt-3">
          {details.join(" · ")}
        </AppText>
      )}
    </View>
  );
};
