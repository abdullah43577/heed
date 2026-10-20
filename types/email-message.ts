import { EmailCategory } from "@/constants/categories";
import { DraftSummary } from "./draft";

export type EmailAction = "MARKED_READ" | "LEFT_UNREAD" | "AWAITING_REPLY" | "UNDONE" | "PENDING_CONFIRM" | "REPLIED";
export type TriageSource = "RULE" | "HEADER" | "AI" | "FALLBACK";

export interface EmailMessage {
  id: string;
  mailAccountId: string;
  gmailMessageId: string;
  gmailThreadId: string;
  fromName: string | null;
  fromEmail: string;
  subject: string;
  receivedAt: string;
  category: EmailCategory | null;
  action: EmailAction | null;
  decidedBy: TriageSource | null;
  summary: string | null;
  reason: string | null;
  triagedAt: string | null;
  backlogRunId: string | null;
  createdAt: string;
  mailAccount: { id: string; email: string };
  draft: DraftSummary | null;
}

export interface CreateSenderRuleRequest {
  pattern: string;
  kind: "ALWAYS_LEAVE";
}
