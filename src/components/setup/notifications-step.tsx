import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";
import { SetupDoneLine } from "./setup-done-line";
import { SetupStepIntro } from "./setup-step-intro";

interface Props {
  isGranted: boolean | null;
  wasDeclined: boolean;
  isRequesting: boolean;
  onEnable: () => void;
}

export const NotificationsStep = function ({ isGranted, wasDeclined, isRequesting, onEnable }: Props) {
  return (
    <View>
      <SetupStepIntro
        illustration="emptyNotifications"
        title="Know when a reply is ready"
        subtitle="Heed only notifies you when someone is waiting on a reply and the draft is ready, and once a day for your report. Nothing else."
      />

      {isGranted ? (
        <SetupDoneLine label="Notifications are on" className="mt-6" />
      ) : (
        <View className="mt-6">
          <AppButton type="submit" label="Turn on notifications" onPress={onEnable} isLoading={isRequesting} />
          {wasDeclined && (
            <AppText type="caption" className="mt-3 text-center">
              {"Notifications are off for Heed. You can turn them on in your phone's settings."}
            </AppText>
          )}
        </View>
      )}
    </View>
  );
};
