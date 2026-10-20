import { EmailCategory } from "@/constants/categories";
import { EmailMessage } from "./email-message";
import { MailAccountStatus } from "./mail-account";

export type BacklogRunStatus = "SCANNING" | "SORTING" | "READY" | "APPLYING" | "DONE" | "CANCELLED" | "FAILED";
export type BacklogWindow = 7 | 30 | 90;

export interface BacklogCounts {
  total: number;
  unsorted: number;
  toMarkRead: number;
  markedRead: number;
  mightNeedReply: number;
  leftForYou: number;
  keptAsIs: number;
  byCategory: Record<EmailCategory, number>;
}

export interface BacklogRun {
  id: string;
  userId: string;
  mailAccountId: string;
  windowDays: BacklogWindow;
  status: BacklogRunStatus;
  total: number;
  sorted: number;
  truncated: boolean;
  markedRead: number | null;
  createdAt: string;
  readyAt: string | null;
  finishedAt: string | null;
  mailAccount: { id: string; email: string; status: MailAccountStatus };
}

export interface BacklogRunDetail extends BacklogRun {
  summary: BacklogCounts;
  mightNeedReply: EmailMessage[];
  leftForYou: EmailMessage[];
}

export interface StartBacklogRunRequest {
  mailAccountId: string;
  windowDays: BacklogWindow;
}
