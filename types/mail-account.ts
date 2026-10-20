export type MailAccountStatus = "ACTIVE" | "NEEDS_REAUTH";

export interface MailAccount {
  id: string;
  email: string;
  status: MailAccountStatus;
  connectedAt: string;
  styleNote: string | null;
  styleLearnedAt: string | null;
}

export interface ConnectMailAccountRequest {
  loginHint?: string;
  returnUrl?: string;
}

export interface ConnectMailAccountResponse {
  url: string;
}
