import { BacklogRunStatus, BacklogWindow } from "../../types/backlog";

export const BACKLOG_WINDOW_OPTIONS: { label: string; value: `${BacklogWindow}` }[] = [
  { label: "7 days", value: "7" },
  { label: "30 days", value: "30" },
  { label: "90 days", value: "90" },
];

export const BACKLOG_MAX_MESSAGES = 5000;

export const BACKLOG_ACTIVE_STATUSES: BacklogRunStatus[] = ["SCANNING", "SORTING", "READY", "APPLYING"];
export const BACKLOG_WORKING_STATUSES: BacklogRunStatus[] = ["SCANNING", "SORTING", "APPLYING"];

export const BACKLOG_STATUS_LABEL: Partial<Record<BacklogRunStatus, string>> = {
  SCANNING: "Looking through it…",
  SORTING: "Sorting…",
  READY: "Ready to review",
  APPLYING: "Marking as read…",
};
