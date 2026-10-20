import { Ionicons } from "@expo/vector-icons";
import { CATEGORY_COLORS_BY_SCHEME } from "./theme";

export type EmailCategory = keyof (typeof CATEGORY_COLORS_BY_SCHEME)["light"];

export const CATEGORY_META = {
  NEEDS_REPLY: { label: "Needs a reply", icon: "arrow-undo-outline" },
  IMPORTANT: { label: "Worth a look", icon: "star-outline" },
  ROUTINE: { label: "Updates", icon: "notifications-outline" },
  NEWSLETTER: { label: "Newsletters", icon: "newspaper-outline" },
  PROMOTION: { label: "Promotions", icon: "pricetag-outline" },
  UNSURE: { label: "Left for you", icon: "help-circle-outline" },
} as const satisfies Record<
  EmailCategory,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
>;

export const HANDLED_CATEGORY_ORDER: EmailCategory[] = [
  "IMPORTANT",
  "UNSURE",
  "ROUTINE",
  "NEWSLETTER",
  "PROMOTION",
  "NEEDS_REPLY",
];

export const REPORT_CATEGORY_ORDER: EmailCategory[] = [
  "IMPORTANT",
  "ROUTINE",
  "NEWSLETTER",
  "PROMOTION",
  "UNSURE",
  "NEEDS_REPLY",
];
