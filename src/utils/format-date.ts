import { format, formatDistanceToNow, isAfter, isToday, isYesterday, parse, startOfDay, subDays } from "date-fns";

export const formatRelativeDate = function (date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isWithinLastDays = function (date: string, days: number) {
  return isAfter(new Date(date), subDays(new Date(), days));
};

export const startOfTodayIso = function () {
  return startOfDay(new Date()).toISOString();
};

export const formatTimeOfDay = function (time: string) {
  return format(parse(time, "HH:mm", new Date()), "p");
};

export const formatReportDate = function (reportDate: string) {
  const date = parse(reportDate, "yyyy-MM-dd", new Date());
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, d MMMM");
};

export const deviceTimeZone = function () {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
};
