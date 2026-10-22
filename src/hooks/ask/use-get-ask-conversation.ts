import { API_ENDPOINTS } from "@/provider/endpoints";
import { AskConversation } from "../../../types/ask";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

export const useGetAskConversation = function ({ conversationId }: { conversationId: string | null }) {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<AskConversation>>({
    url: API_ENDPOINTS.ask.conversation(conversationId ?? ""),
    shouldFetch: !!conversationId,
  });

  return {
    askConversation: conversationId ? data?.data ?? null : null,
    isFetchingAskConversation: isFetching,
    errorAskConversation: error,
    refetchAskConversation: refetch,
  };
};
