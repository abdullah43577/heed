import { DraftStatus, RewritePreset } from "../../types/draft";

export const REWRITE_PRESETS: { value: RewritePreset; label: string }[] = [
  { value: "shorter", label: "Shorter" },
  { value: "warmer", label: "Warmer" },
  { value: "formal", label: "More formal" },
  { value: "decline", label: "Decline politely" },
];

export const UNDO_WINDOW_MS = 5000;

export const OPEN_DRAFT_STATUSES: DraftStatus[] = ["PENDING", "SCHEDULED", "SENDING", "FAILED"];
export const EDITABLE_DRAFT_STATUSES: DraftStatus[] = ["PENDING", "FAILED"];
export const IN_FLIGHT_DRAFT_STATUSES: DraftStatus[] = ["SCHEDULED", "SENDING"];

// Server codes that are a state to act on, not a failure: shown as warnings.
export const DRAFT_WARNING_CODES = ["DRAFT_HAS_PLACEHOLDERS", "DRAFT_ALREADY_SENT", "ACCOUNT_NEEDS_REAUTH"];
