// Mirrors the AppError codes in ../heed-server/src/lib/errors.ts.
export const AI_ERROR_CODES = {
  AI_UNAVAILABLE: "AI_UNAVAILABLE",
  AI_QUOTA_EXCEEDED: "AI_QUOTA_EXCEEDED",
} as const;

export const isAiErrorCode = function (code?: string) {
  return Object.values<string>(AI_ERROR_CODES).includes(code ?? "");
};
