import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";
import { SetupDoneLine } from "./setup-done-line";
import { SetupStepIntro } from "./setup-step-intro";

interface Props {
  email: string;
  styleNote: string | null;
  onLearn: () => void;
  isLearning: boolean;
}

export const StyleStep = function ({ email, styleNote, onLearn, isLearning }: Props) {
  return (
    <View>
      <SetupStepIntro
        illustration="setupStyle"
        title="Make drafts sound like you"
        subtitle={`Heed reads your recent sent mail in ${email} and writes a short note on how you write: greeting, sign-off, length and tone. It shapes how drafts sound, never what they say.`}
      />

      {styleNote ? (
        <View className="mt-6">
          <SetupDoneLine label="Heed learned how you write" />
          <View className="mt-3 rounded-lg bg-surface-muted px-3.5 py-3">
            <AppText type="body" numberOfLines={8}>
              {styleNote}
            </AppText>
          </View>
          <AppText type="caption" className="mt-3 px-1">
            You can edit it any time in Profile → Gmail accounts.
          </AppText>
        </View>
      ) : (
        <AppButton type="submit" label="Learn how I write" onPress={onLearn} isLoading={isLearning} className="mt-6" />
      )}
    </View>
  );
};
