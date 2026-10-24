import type { IllustrationName } from "@/components/illustrations/illustration";

export interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  illustration: IllustrationName;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "noise",
    title: "Most email doesn't need you",
    subtitle:
      "Receipts, updates, newsletters and promotions pile up as unread mail, and the few emails where someone is waiting on you get lost among them.",
    illustration: "onboardingNoise",
  },
  {
    id: "reads",
    title: "Heed reads it for you",
    subtitle:
      "Mail that needs no reply is marked read and labelled in Gmail, never deleted or archived. One report a day tells you what it read. Anything Heed isn't sure about stays unread for you.",
    illustration: "onboardingReads",
  },
  {
    id: "reply",
    title: "You only reply",
    subtitle:
      "When someone is waiting on you, Heed drafts the reply in your own style. You review it, and nothing is sent until you tap Send.",
    illustration: "onboardingReply",
  },
];
