import { API_ENDPOINTS } from "@/provider/endpoints";
import { DailyReport } from "../../../types/report";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

export const useGetReports = function () {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<DailyReport[]>>({
    url: API_ENDPOINTS.reports.list,
  });

  return {
    reports: data?.data ?? [],
    hasLoadedReports: !!data,
    isFetchingReports: isFetching,
    errorReports: error,
    refetchReports: refetch,
  };
};
