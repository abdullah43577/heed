import { formatDistanceToNow, startOfDay } from "date-fns";

export const formatRelativeDate = function (date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const startOfTodayIso = function () {
  return startOfDay(new Date()).toISOString();
};
