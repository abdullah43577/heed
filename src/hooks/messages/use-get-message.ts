import { API_ENDPOINTS } from "@/provider/endpoints";
import { EmailMessage } from "../../../types/email-message";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

interface UseGetMessageOptions {
  messageId: string;
  shouldFetch?: boolean;
}

export const useGetMessage = function (options: UseGetMessageOptions) {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<EmailMessage>>({
    url: API_ENDPOINTS.messages.detail(options.messageId),
    shouldFetch: options.shouldFetch ?? true,
  });

  return {
    message: data?.data,
    isFetchingMessage: isFetching,
    errorMessage: error,
    refetchMessage: refetch,
  };
};
