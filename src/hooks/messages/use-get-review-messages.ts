import { API_ENDPOINTS } from "@/provider/endpoints";
import { EmailMessage } from "../../../types/email-message";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

export const useGetReviewMessages = function () {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<EmailMessage[]>>({
    url: API_ENDPOINTS.messages.review,
  });

  return {
    reviewMessages: data?.data ?? [],
    hasLoadedReviewMessages: !!data,
    isFetchingReviewMessages: isFetching,
    errorReviewMessages: error,
    refetchReviewMessages: refetch,
  };
};
