export const MAX_MAIL_ACCOUNTS = 5;

// Mirrors the codes the server's OAuth callback puts in the return url.
export const CONNECT_ERROR_MESSAGES: Record<string, string> = {
  GMAIL_SCOPE_MISSING:
    "Heed needs permission to read and send your mail. Try again and tick the Gmail box on Google's screen.",
  ACCOUNT_LIMIT: "You can connect up to five Gmail accounts. Disconnect one to add another.",
  OAUTH_STATE_INVALID: "That sign-in took too long. Please try connecting again.",
  OAUTH_FAILED: "Google didn't finish connecting that account. Please try again.",
};
