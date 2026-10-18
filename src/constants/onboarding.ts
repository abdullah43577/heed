import type { PeepName } from "@/components/illustrations/peeps.generated";
import { EmailCategory } from "./categories";

export interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  illustration: PeepName;
  accent: EmailCategory;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "reads",
    title: "An inbox that reads itself",
    subtitle:
      "Heed goes through new mail as it arrives and quietly handles everything that does not need you.",
    illustration: "onboardingNoise",
    accent: "NEWSLETTER",
  },
  {
    id: "replies",
    title: "Replies, drafted for you",
    subtitle:
      "When someone is waiting on you, Heed writes a draft. Nothing is ever sent until you tap Send.",
    illustration: "onboardingReply",
    accent: "NEEDS_REPLY",
  },
  {
    id: "report",
    title: "One report at the end of the day",
    subtitle:
      "See how many emails Heed read for you, a line on each, and anything worth a look first.",
    illustration: "onboardingReads",
    accent: "IMPORTANT",
  },
];
