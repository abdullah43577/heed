import { EmailCategory } from "@/constants/categories";
import { EmailMessage } from "./email-message";

export interface ReportAccountTotals {
  mailAccountId: string;
  email: string;
  total: number;
  read: number;
}

export interface ReportTotals {
  total: number;
  read: number;
  worthALook: number;
  leftForYou: number;
  awaitingReply: number;
  byCategory: Record<EmailCategory, number>;
  byAccount: ReportAccountTotals[];
}

export interface DailyReport {
  id: string;
  userId: string;
  reportDate: string;
  periodStart: string;
  periodEnd: string;
  totals: ReportTotals;
  headline: string;
  createdAt: string;
}

export interface DailyReportDetail extends DailyReport {
  messages: EmailMessage[];
}
