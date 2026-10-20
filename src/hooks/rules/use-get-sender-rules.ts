import { API_ENDPOINTS } from "@/provider/endpoints";
import { APIResponse } from "../../../types/response";
import { SenderRule } from "../../../types/sender-rule";
import { useGetData } from "../use-get-data";

interface UseGetSenderRulesOptions {
  mailAccountId?: string;
  shouldFetch?: boolean;
}

export const useGetSenderRules = function (options: UseGetSenderRulesOptions = {}) {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<SenderRule[]>>({
    url: options.mailAccountId ? API_ENDPOINTS.rules.forAccount(options.mailAccountId) : API_ENDPOINTS.rules.list,
    shouldFetch: options.shouldFetch ?? true,
  });

  return {
    senderRules: data?.data ?? [],
    hasLoadedSenderRules: !!data,
    isFetchingSenderRules: isFetching,
    errorSenderRules: error,
    refetchSenderRules: refetch,
  };
};
