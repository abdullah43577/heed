import { AppText } from "@/components/shared/app-text";
import { SectionHeader } from "@/components/shared/section-header";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatRelativeDate } from "@/utils/format-date";
import { ChevronRight, Inbox } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { BacklogRun } from "../../../types/backlog";

interface Props {
  runs: BacklogRun[];
  onPressRun: (run: BacklogRun) => void;
}

export const BacklogResults = function ({ runs, onPressRun }: Props) {
  const { categoryTint, foregroundSubtle } = useThemeColors();
  const { color, holder } = categoryTint("NEEDS_REPLY");

  if (runs.length === 0) return null;

  return (
    <View>
      <SectionHeader title="Backlog tidied" />

      <View className="overflow-hidden rounded-xl border-hairline border-line bg-surface">
        {runs.map((run, index) => (
          <View key={run.id}>
            {index > 0 && <View className="ml-[62px] h-px bg-line" />}
            <Pressable
              onPress={() => onPressRun(run)}
              className="flex-row items-center gap-3 px-3.5 py-3 active:bg-surface-muted"
            >
              <View className="items-center justify-center rounded-full" style={{ width: 36, height: 36, backgroundColor: holder }}>
                <Inbox size={18} color={color} strokeWidth={1.75} />
              </View>

              <View className="flex-1">
                <AppText type="body" numberOfLines={1} className="font-inter-medium">
                  {(run.markedRead ?? 0).toLocaleString()} read for you
                </AppText>
                <AppText type="subtitle" numberOfLines={1}>
                  {run.mailAccount.email}
                  {run.finishedAt ? ` · ${formatRelativeDate(run.finishedAt)}` : ""}
                </AppText>
              </View>

              <ChevronRight size={18} color={foregroundSubtle} strokeWidth={1.75} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};
