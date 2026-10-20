import { EmailMessage } from "./email-message";

export type DraftStatus = "PENDING" | "SCHEDULED" | "SENDING" | "SENT" | "DISMISSED" | "REPLIED_ELSEWHERE" | "FAILED";

export interface DraftSummary {
  id: string;
  status: DraftStatus;
  body: string;
  replyAll: boolean;
  sendAt: string | null;
  updatedAt: string;
}

export interface ThreadMessage {
  gmailMessageId: string;
  from: string;
  to: string;
  date: string;
  sentAt: string;
  fromMe: boolean;
  bodyText: string;
}

export interface Recipient {
  name: string;
  address: string;
}

export interface Recipients {
  to: Recipient[];
  cc: Recipient[];
}

export interface ReplyDraft {
  id: string;
  emailMessageId: string;
  status: DraftStatus;
  body: string;
  replyAll: boolean;
  sendAt: string | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
  placeholders: string[];
  thread: ThreadMessage[];
  recipients: { reply: Recipients; replyAll: Recipients } | null;
  emailMessage: Omit<EmailMessage, "draft"> & { mailAccount: { id: string; email: string; status: string } };
}

export type RewritePreset = "shorter" | "warmer" | "formal" | "decline";

export interface RewriteDraftRequest {
  id: string;
  preset?: RewritePreset;
  instruction?: string;
  body?: string;
}

export interface SendDraftRequest {
  id: string;
  body: string;
  replyAll: boolean;
}
