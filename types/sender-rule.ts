export type SenderRuleKind = "ALWAYS_LEAVE" | "ALWAYS_HANDLE" | "NEVER_DRAFT";

export interface SenderRule {
  id: string;
  pattern: string;
  kind: SenderRuleKind;
  mailAccountId: string | null;
  mailAccount: { id: string; email: string } | null;
  createdAt: string;
}

export interface CreateSenderRuleRequest {
  pattern: string;
  kind: SenderRuleKind;
  mailAccountId?: string | null;
}
