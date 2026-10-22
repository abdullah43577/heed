import { Bell, CircleAlert, CircleHelp, Newspaper, Reply, Tag, type LucideIcon } from "lucide-react-native";
import { CATEGORY_COLORS_BY_SCHEME } from "./theme";

export type EmailCategory = keyof (typeof CATEGORY_COLORS_BY_SCHEME)["light"];

export const CATEGORY_META = {
  NEEDS_REPLY: { label: "Needs a reply", icon: Reply },
  IMPORTANT: { label: "Worth a look", icon: CircleAlert },
  ROUTINE: { label: "Updates", icon: Bell },
  NEWSLETTER: { label: "Newsletters", icon: Newspaper },
  PROMOTION: { label: "Promotions", icon: Tag },
  UNSURE: { label: "Left for you", icon: CircleHelp },
} as const satisfies Record<EmailCategory, { label: string; icon: LucideIcon }>;

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
