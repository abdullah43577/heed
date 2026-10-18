import { COLORS } from "@/constants/colors";

export const accountColor = function (email: string) {
  let hash = 0;
  for (const char of email) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return COLORS[Math.abs(hash) % COLORS.length]!;
};
