import { AppText } from "@/components/shared/app-text";
import { SectionHeader } from "@/components/shared/section-header";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { formatRelativeDate } from "@/utils/format-date";
import { Ionicons } from "@expo/vector-icons";
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

      <View className="overflow-hidden rounded-2xl border-hairline border-line bg-surface">
        {runs.map((run, index) => (
          <View key={run.id}>
            {index > 0 && <View className="ml-16 h-px bg-line" />}
            <Pressable
              onPress={() => onPressRun(run)}
              className="flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-muted"
            >
              <View
                className="items-center justify-center rounded-squircle"
                style={{ width: 38, height: 38, backgroundColor: holder }}
              >
                <Ionicons name="file-tray-full-outline" size={18} color={color} />
              </View>

              <View className="flex-1">
                <AppText type="label" numberOfLines={1}>
                  {(run.markedRead ?? 0).toLocaleString()} read for you
                </AppText>
                <AppText type="subtitle" numberOfLines={1} className="mt-0.5">
                  {run.mailAccount.email}
                  {run.finishedAt ? ` · ${formatRelativeDate(run.finishedAt)}` : ""}
                </AppText>
              </View>

              <Ionicons name="chevron-forward" size={16} color={foregroundSubtle} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};
