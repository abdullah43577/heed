import { DRAFT_WARNING_CODES } from "@/constants/drafts";
import { API_ENDPOINTS } from "@/provider/endpoints";
import { queryClient } from "@/utils/queryClient";
import { ReplyDraft, RewriteDraftRequest, SendDraftRequest } from "../../../types/draft";
import { APIResponse } from "../../../types/response";
import { refreshMessageQueries } from "../messages/refresh-message-queries";
import { useAiErrorHandler } from "../use-ai-error-handler";
import { useSubmitData } from "../use-submit-data";

interface UseDraftActionsOptions {
  onRewritten?: (draft: ReplyDraft) => void;
  onScheduled?: (draft: ReplyDraft) => void;
  onUndone?: (draft: ReplyDraft) => void;
  onDismissed?: () => void;
}

// Writes the server's answer straight into the draft's cache entry, so the screen never shows a stale status.
const putDraft = function (draft: ReplyDraft) {
  queryClient.setQueryData([API_ENDPOINTS.drafts.detail(draft.id)], { message: "", data: draft });
};

export const useDraftActions = function (options: UseDraftActionsOptions = {}) {
  const onError = useAiErrorHandler(DRAFT_WARNING_CODES);

  const { mutate: saveDraft, isPending: isSaving } = useSubmitData<
    { id: string; body?: string; replyAll?: boolean },
    APIResponse<ReplyDraft>
  >({
    url: ({ id }) => API_ENDPOINTS.drafts.update(id),
    method: "patch",
    getBody: ({ id: _id, ...body }) => body,
    silent: true,
    onError,
    onSuccess: (response) => putDraft(response.data),
  });

  const { mutate: rewriteDraft, isPending: isRewriting } = useSubmitData<RewriteDraftRequest, APIResponse<ReplyDraft>>({
    url: ({ id }) => API_ENDPOINTS.drafts.rewrite(id),
    getBody: ({ id: _id, ...body }) => body,
    onLoadingMessage: "Rewriting…",
    onSuccessMessage: "Draft rewritten",
    onError,
    onSuccess: (response) => {
      putDraft(response.data);
      options.onRewritten?.(response.data);
    },
  });

  const { mutate: sendDraft, isPending: isSending } = useSubmitData<SendDraftRequest, APIResponse<ReplyDraft>>({
    url: ({ id }) => API_ENDPOINTS.drafts.send(id),
    getBody: ({ id: _id, ...body }) => body,
    silent: true,
    onError,
    onSuccess: (response) => {
      putDraft(response.data);
      options.onScheduled?.(response.data);
    },
  });

  const { mutate: undoSend, isPending: isUndoing } = useSubmitData<{ id: string }, APIResponse<ReplyDraft>>({
    url: ({ id }) => API_ENDPOINTS.drafts.cancel(id),
    getBody: () => undefined,
    onSuccessMessage: "Not sent",
    onError,
    onSuccess: (response) => {
      putDraft(response.data);
      options.onUndone?.(response.data);
    },
  });

  const { mutate: dismissDraft, isPending: isDismissing } = useSubmitData<{ id: string }, APIResponse<unknown>>({
    url: ({ id }) => API_ENDPOINTS.drafts.dismiss(id),
    getBody: () => undefined,
    onSuccessMessage: "Marked as handled",
    onError,
    onSuccess: () => {
      refreshMessageQueries();
      options.onDismissed?.();
    },
  });

  return {
    saveDraft,
    rewriteDraft,
    sendDraft,
    undoSend,
    dismissDraft,
    isSaving,
    isRewriting,
    isSending,
    isUndoing,
    isDismissing,
  };
};
