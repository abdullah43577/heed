import { API_ENDPOINTS } from "@/provider/endpoints";
import { startOfTodayIso } from "@/utils/format-date";
import { EmailMessage } from "../../../types/email-message";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

export const useGetHandledMessages = function () {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<EmailMessage[]>>({
    url: API_ENDPOINTS.messages.handledSince(startOfTodayIso()),
  });

  return {
    handledMessages: data?.data ?? [],
    hasLoadedHandledMessages: !!data,
    isFetchingHandledMessages: isFetching,
    errorHandledMessages: error,
    refetchHandledMessages: refetch,
  };
};
