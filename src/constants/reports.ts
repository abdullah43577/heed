import { formatTimeOfDay } from "@/utils/format-date";

export const DEFAULT_REPORT_TIME = "18:00";

export const REPORT_TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const value = `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`;
  return { value, label: formatTimeOfDay(value) };
});
