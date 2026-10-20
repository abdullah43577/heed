import { EDITABLE_DRAFT_STATUSES } from "@/constants/drafts";
import { useEffect, useRef, useState } from "react";
import { ReplyDraft } from "../../../types/draft";
import { useDebounce } from "../use-debounce";

const AUTOSAVE_MS = 1200;

// Local edits are the source of truth while the screen is open: a refetch (the send poll, a cache write)
// must not clobber what the user is typing, so the body is hydrated once per draft id.
export const useDraftEditor = function (
  draft: ReplyDraft | undefined,
  save: (change: { id: string; body: string }) => void,
) {
  const [body, setBody] = useState("");
  const [replyAll, setReplyAll] = useState(false);
  const hydratedId = useRef<string | null>(null);
  const savedBody = useRef("");

  useEffect(() => {
    if (!draft || hydratedId.current === draft.id) return;
    hydratedId.current = draft.id;
    savedBody.current = draft.body;
    setBody(draft.body);
    setReplyAll(draft.replyAll);
  }, [draft]);

  const isEditable = !!draft && EDITABLE_DRAFT_STATUSES.includes(draft.status);
  const debouncedBody = useDebounce(body, AUTOSAVE_MS);

  useEffect(() => {
    if (!draft || !isEditable || hydratedId.current !== draft.id) return;
    if (debouncedBody === savedBody.current) return;
    savedBody.current = debouncedBody;
    save({ id: draft.id, body: debouncedBody });
  }, [debouncedBody]);

  // A rewrite comes back from the server already saved.
  const replaceBody = function (next: string) {
    savedBody.current = next;
    setBody(next);
  };

  return { body, setBody, replaceBody, replyAll, setReplyAll, isEditable };
};
