import { CheckCheck, Hand, PenOff, type LucideIcon } from "lucide-react-native";
import { SenderRuleKind } from "../../types/sender-rule";
import { EmailCategory } from "./categories";

export const RULE_KIND_META = {
  ALWAYS_LEAVE: {
    label: "Always leave for me",
    description: "Heed never marks their mail as read.",
    icon: Hand,
    tint: "IMPORTANT",
  },
  ALWAYS_HANDLE: {
    label: "Always handle",
    description: "Marked read and labelled straight away, without the AI.",
    icon: CheckCheck,
    tint: "ROUTINE",
  },
  NEVER_DRAFT: {
    label: "Never draft",
    description: "No automatic drafts. You can still tap Draft a reply.",
    icon: PenOff,
    tint: "NEWSLETTER",
  },
} as const satisfies Record<
  SenderRuleKind,
  { label: string; description: string; icon: LucideIcon; tint: EmailCategory }
>;

export const RULE_KINDS: SenderRuleKind[] = ["ALWAYS_LEAVE", "ALWAYS_HANDLE", "NEVER_DRAFT"];

// Mirrors createSenderRuleSchema on the server.
export const SENDER_PATTERN = /^([^\s@]+@[^\s@]+\.[^\s@]+|@[a-z0-9.-]+\.[a-z]{2,})$/i;

export const MAX_INSTRUCTION_CHARS = 500;
