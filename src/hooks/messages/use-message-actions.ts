import { API_ENDPOINTS } from "@/provider/endpoints";
import { CreateSenderRuleRequest, EmailMessage } from "../../../types/email-message";
import { APIResponse } from "../../../types/response";
import { useSubmitData } from "../use-submit-data";
import { refreshMessageQueries } from "./refresh-message-queries";

export const useMessageActions = function () {
  const { mutate: undoMarkRead, isPending: isUndoing } = useSubmitData<
    { id: string },
    APIResponse<EmailMessage>
  >({
    url: ({ id }) => API_ENDPOINTS.messages.undo(id),
    getBody: () => undefined,
    onSuccessMessage: "Marked unread in Gmail",
    onSuccess: () => refreshMessageQueries(),
  });

  const { mutate: dismissReply, isPending: isDismissing } = useSubmitData<
    { id: string },
    APIResponse<EmailMessage>
  >({
    url: ({ id }) => API_ENDPOINTS.messages.dismiss(id),
    getBody: () => undefined,
    onSuccessMessage: "Marked as handled",
    onSuccess: () => refreshMessageQueries(),
  });

  const { mutate: createSenderRule, isPending: isCreatingRule } = useSubmitData<
    CreateSenderRuleRequest,
    APIResponse<unknown>
  >({
    url: API_ENDPOINTS.rules.create,
    onSuccessMessage: "Heed will leave this sender's mail for you",
  });

  return {
    undoMarkRead,
    dismissReply,
    createSenderRule,
    isActing: isUndoing || isDismissing || isCreatingRule,
  };
};
