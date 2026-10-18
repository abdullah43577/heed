import { API_ENDPOINTS } from "@/provider/endpoints";
import { MailAccount } from "../../../types/mail-account";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

export const useGetMailAccounts = function () {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<MailAccount[]>>({
    url: API_ENDPOINTS.mailAccounts.list,
  });

  return {
    mailAccounts: data?.data ?? [],
    hasLoadedMailAccounts: !!data,
    isFetchingMailAccounts: isFetching,
    errorMailAccounts: error,
    refetchMailAccounts: refetch,
  };
};
