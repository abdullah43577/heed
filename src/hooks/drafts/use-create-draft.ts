import { API_ENDPOINTS } from "@/provider/endpoints";
import { queryClient } from "@/utils/queryClient";
import { ReplyDraft } from "../../../types/draft";
import { APIResponse } from "../../../types/response";
import { refreshMessageQueries } from "../messages/refresh-message-queries";
import { useAiErrorHandler } from "../use-ai-error-handler";
import { useSubmitData } from "../use-submit-data";

interface UseCreateDraftOptions {
  onCreated?: (draft: ReplyDraft) => void;
}

// "Draft a reply" for any email. Returns the open draft when there already is one, without an AI call.
export const useCreateDraft = function (options: UseCreateDraftOptions = {}) {
  const onError = useAiErrorHandler(["ACCOUNT_NEEDS_REAUTH"]);

  const { mutate, isPending } = useSubmitData<{ messageId: string }, APIResponse<ReplyDraft>>({
    url: ({ messageId }) => API_ENDPOINTS.messages.draft(messageId),
    getBody: () => undefined,
    // The loading toast stays until another replaces it, so success must not be silent here.
    onLoadingMessage: "Drafting a reply…",
    onSuccessMessage: "Draft ready",
    onError,
    onSuccess: (response) => {
      queryClient.setQueryData([API_ENDPOINTS.drafts.detail(response.data.id)], response);
      refreshMessageQueries();
      options.onCreated?.(response.data);
    },
  });

  return { createDraft: mutate, isCreatingDraft: isPending };
};
