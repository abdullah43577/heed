import { API_ENDPOINTS } from "@/provider/endpoints";
import { AskConversationSummary } from "../../../types/ask";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

export const useGetAskConversations = function () {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<AskConversationSummary[]>>({
    url: API_ENDPOINTS.ask.conversations,
  });

  return {
    askConversations: data?.data ?? [],
    hasLoadedAskConversations: !!data,
    isFetchingAskConversations: isFetching,
    errorAskConversations: error,
    refetchAskConversations: refetch,
  };
};
