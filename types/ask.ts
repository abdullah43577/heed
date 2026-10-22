export type AskRole = "USER" | "ASSISTANT";

export interface AskCitation {
  n: number;
  emailMessageId: string | null;
  mailAccountId: string;
  accountEmail: string;
  gmailMessageId: string;
  fromName: string | null;
  fromEmail: string;
  subject: string;
  receivedAt: string;
}

export interface AskMessage {
  id: string;
  conversationId: string;
  role: AskRole;
  content: string;
  citations: AskCitation[] | null;
  createdAt: string;
}

export interface AskConversationSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface AskConversation extends AskConversationSummary {
  messages: AskMessage[];
}

export type AskStatus = { stage: "searching" } | { stage: "reading"; count: number };

export interface AskQuestionRequest {
  question: string;
}
