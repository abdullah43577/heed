import { API_ENDPOINTS } from "@/provider/endpoints";
import { AskConversation, AskQuestionRequest } from "../../../types/ask";
import { APIResponse } from "../../../types/response";
import { useSubmitData } from "../use-submit-data";
import { refreshAskConversations, setAskConversation } from "./ask-cache";

export const useAskActions = function ({ onAsked }: { onAsked: (conversation: AskConversation) => void }) {
  const handleAsked = function (response: APIResponse<AskConversation>) {
    setAskConversation(response.data);
    refreshAskConversations();
    onAsked(response.data);
  };

  const { mutate: startConversation, isPending: isStarting } = useSubmitData<
    AskQuestionRequest,
    APIResponse<AskConversation>
  >({
    url: API_ENDPOINTS.ask.conversations,
    silent: true,
    onSuccess: handleAsked,
  });

  const { mutate: addQuestion, isPending: isAdding } = useSubmitData<
    AskQuestionRequest & { conversationId: string },
    APIResponse<AskConversation>
  >({
    url: ({ conversationId }) => API_ENDPOINTS.ask.questions(conversationId),
    getBody: ({ question }) => ({ question }),
    silent: true,
    onSuccess: handleAsked,
  });

  const { mutate: deleteConversation, isPending: isDeleting } = useSubmitData<{ id: string }, APIResponse<null>>({
    url: ({ id }) => API_ENDPOINTS.ask.conversation(id),
    method: "delete",
    getBody: () => undefined,
    onSuccessMessage: "Conversation deleted",
    additionalQueryKeys: [[API_ENDPOINTS.ask.conversations]],
  });

  return {
    startConversation,
    addQuestion,
    deleteConversation,
    isAsking: isStarting || isAdding,
    isDeletingConversation: isDeleting,
  };
};
