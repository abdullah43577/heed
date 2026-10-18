import { formatDistanceToNow } from "date-fns";

export const formatRelativeDate = function (date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
