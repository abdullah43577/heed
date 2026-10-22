import { Illustration } from "@/components/illustrations/illustration";
import { AppText } from "@/components/shared/app-text";
import { OnboardingSlide as Slide } from "@/constants/onboarding";
import { View } from "react-native";

interface Props {
  slide: Slide;
  width: number;
}

export const OnboardingSlide = function ({ slide, width }: Props) {
  return (
    <View style={{ width }} className="flex-1 justify-center px-8">
      {/* self-start: a column parent stretches its children to full width. */}
      <View className="self-start">
        <Illustration name={slide.illustration} size={240} />
      </View>

      <AppText type="display" className="mt-8 text-[26px] leading-[32px]">
        {slide.title}
      </AppText>

      <AppText type="subtitle" className="mt-3 text-[15px] leading-[22px]">
        {slide.subtitle}
      </AppText>
    </View>
  );
};
