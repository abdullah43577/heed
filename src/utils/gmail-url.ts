export const gmailMessageUrl = function (accountEmail: string, gmailMessageId: string) {
  return `https://mail.google.com/mail/u/${encodeURIComponent(accountEmail)}/#all/${gmailMessageId}`;
};
