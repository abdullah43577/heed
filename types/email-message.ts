export interface EmailMessage {
  id: string;
  mailAccountId: string;
  gmailMessageId: string;
  gmailThreadId: string;
  fromName: string | null;
  fromEmail: string;
  subject: string;
  receivedAt: string;
  createdAt: string;
  mailAccount: { id: string; email: string };
}
