import { API_ENDPOINTS } from "@/provider/endpoints";
import { BacklogRun } from "../../../types/backlog";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

interface UseGetBacklogRunsOptions {
  mailAccountId?: string;
  shouldFetch?: boolean;
}

export const useGetBacklogRuns = function (options: UseGetBacklogRunsOptions = {}) {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<BacklogRun[]>>({
    url: options.mailAccountId
      ? API_ENDPOINTS.backlog.forAccount(options.mailAccountId)
      : API_ENDPOINTS.backlog.list,
    shouldFetch: options.shouldFetch ?? true,
  });

  return {
    backlogRuns: data?.data ?? [],
    hasLoadedBacklogRuns: !!data,
    isFetchingBacklogRuns: isFetching,
    errorBacklogRuns: error,
    refetchBacklogRuns: refetch,
  };
};
