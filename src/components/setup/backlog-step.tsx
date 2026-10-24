import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { BACKLOG_WINDOW_OPTIONS } from "@/constants/backlog";
import { View } from "react-native";
import { BacklogWindow } from "../../../types/backlog";
import { SetupDoneLine } from "./setup-done-line";
import { SetupStepIntro } from "./setup-step-intro";

interface Props {
  email: string;
  windowDays: BacklogWindow;
  onWindowChange: (windowDays: BacklogWindow) => void;
  onStart: () => void;
  isStarting: boolean;
  hasStarted: boolean;
}

export const BacklogStep = function ({ email, windowDays, onWindowChange, onStart, isStarting, hasStarted }: Props) {
  return (
    <View>
      <SetupStepIntro
        illustration="onboardingReads"
        title="Tidy your backlog?"
        subtitle={`Heed only handles new mail by itself. It can also sort the unread mail already sitting in ${email}, then show you what it would mark as read. Nothing changes in Gmail until you confirm.`}
      />

      {hasStarted ? (
        <View className="mt-6">
          <SetupDoneLine label="Heed is sorting your backlog" />
          <AppText type="subtitle" className="mt-1.5">
            {"You'll get a notification when it's ready to review. It's also under Profile → Gmail accounts."}
          </AppText>
        </View>
      ) : (
        <View className="mt-6">
          <AppText type="default" className="mb-2.5 text-foreground-muted">
            Unread mail from the last
          </AppText>
          <SegmentedControl
            options={BACKLOG_WINDOW_OPTIONS}
            value={`${windowDays}`}
            onChange={(value) => onWindowChange(Number(value) as BacklogWindow)}
            disabled={isStarting}
          />
          <AppButton type="submit" label="Tidy my backlog" onPress={onStart} isLoading={isStarting} className="mt-5" />
        </View>
      )}
    </View>
  );
};
