import { API_ENDPOINTS } from "@/provider/endpoints";
import { queryClient } from "@/utils/queryClient";
import { AskConversation, AskMessage } from "../../../types/ask";
import { APIResponse } from "../../../types/response";

export const setAskConversation = function (conversation: AskConversation) {
  queryClient.setQueryData<APIResponse<AskConversation>>([API_ENDPOINTS.ask.conversation(conversation.id)], {
    message: "",
    data: conversation,
  });
};

export const appendAskMessage = function (message: AskMessage) {
  queryClient.setQueryData<APIResponse<AskConversation>>(
    [API_ENDPOINTS.ask.conversation(message.conversationId)],
    (current) =>
      current && {
        ...current,
        data: { ...current.data, messages: [...current.data.messages.filter((m) => m.id !== message.id), message] },
      },
  );
};

export const refreshAskConversations = function () {
  queryClient.refetchQueries({ queryKey: [API_ENDPOINTS.ask.conversations] });
};
