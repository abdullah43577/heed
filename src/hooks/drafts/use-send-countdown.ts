import { UNDO_WINDOW_MS } from "@/constants/drafts";
import { useEffect, useState } from "react";
import { ReplyDraft } from "../../../types/draft";

const TICK_MS = 250;

// The countdown runs on the phone's clock from the moment Send was tapped, so a skewed server
// clock cannot make Undo look available after the server has already taken the draft.
export const useSendCountdown = function (draft: ReplyDraft | undefined) {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const isScheduled = draft?.status === "SCHEDULED";
  const sendAt = draft?.sendAt;

  useEffect(() => {
    if (!isScheduled) {
      setDeadline(null);
      return;
    }
    setDeadline((current) => current ?? (sendAt ? new Date(sendAt).getTime() : Date.now() + UNDO_WINDOW_MS));
  }, [isScheduled, sendAt]);

  useEffect(() => {
    if (deadline === null) return;
    const update = () => setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    update();
    const timer = setInterval(update, TICK_MS);
    return () => clearInterval(timer);
  }, [deadline]);

  const startCountdown = function () {
    setSecondsLeft(UNDO_WINDOW_MS / 1000);
    setDeadline(Date.now() + UNDO_WINDOW_MS);
  };

  const mode: "edit" | "countdown" | "sending" =
    draft?.status === "SENDING" || (isScheduled && deadline !== null && secondsLeft === 0)
      ? "sending"
      : isScheduled
        ? "countdown"
        : "edit";

  return { mode, secondsLeft, startCountdown };
};
