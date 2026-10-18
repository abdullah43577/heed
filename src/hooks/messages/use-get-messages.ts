import { API_ENDPOINTS } from "@/provider/endpoints";
import { EmailMessage } from "../../../types/email-message";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

export const useGetMessages = function () {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<EmailMessage[]>>({
    url: API_ENDPOINTS.messages.list,
  });

  return {
    messages: data?.data ?? [],
    hasLoadedMessages: !!data,
    isFetchingMessages: isFetching,
    errorMessages: error,
    refetchMessages: refetch,
  };
};
