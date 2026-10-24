import { Illustration, type IllustrationName } from "@/components/illustrations/illustration";
import { AppText } from "@/components/shared/app-text";
import { View } from "react-native";

interface Props {
  illustration: IllustrationName;
  title: string;
  subtitle: string;
}

export const SetupStepIntro = function ({ illustration, title, subtitle }: Props) {
  return (
    <View>
      <View className="self-start">
        <Illustration name={illustration} size={148} />
      </View>

      <AppText type="display" className="mt-5">
        {title}
      </AppText>
      <AppText type="subtitle" className="mt-2 text-[14px] leading-[21px]">
        {subtitle}
      </AppText>
    </View>
  );
};
