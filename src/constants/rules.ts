import { Ionicons } from "@expo/vector-icons";
import { SenderRuleKind } from "../../types/sender-rule";
import { EmailCategory } from "./categories";

export const RULE_KIND_META = {
  ALWAYS_LEAVE: {
    label: "Always leave for me",
    description: "Heed never marks their mail as read.",
    icon: "hand-left-outline",
    tint: "IMPORTANT",
  },
  ALWAYS_HANDLE: {
    label: "Always handle",
    description: "Marked read and labelled straight away, without the AI.",
    icon: "checkmark-done-outline",
    tint: "ROUTINE",
  },
  NEVER_DRAFT: {
    label: "Never draft",
    description: "No automatic drafts. You can still tap Draft a reply.",
    icon: "create-outline",
    tint: "NEWSLETTER",
  },
} as const satisfies Record<
  SenderRuleKind,
  { label: string; description: string; icon: keyof typeof Ionicons.glyphMap; tint: EmailCategory }
>;

export const RULE_KINDS: SenderRuleKind[] = ["ALWAYS_LEAVE", "ALWAYS_HANDLE", "NEVER_DRAFT"];

// Mirrors createSenderRuleSchema on the server.
export const SENDER_PATTERN = /^([^\s@]+@[^\s@]+\.[^\s@]+|@[a-z0-9.-]+\.[a-z]{2,})$/i;

export const MAX_INSTRUCTION_CHARS = 500;
