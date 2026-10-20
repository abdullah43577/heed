import { API_ENDPOINTS } from "@/provider/endpoints";
import { DailyReportDetail } from "../../../types/report";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

interface UseGetReportOptions {
  reportId: string;
  shouldFetch?: boolean;
}

export const useGetReport = function (options: UseGetReportOptions) {
  const { data, isFetching, error, refetch } = useGetData<APIResponse<DailyReportDetail>>({
    url: API_ENDPOINTS.reports.detail(options.reportId),
    shouldFetch: options.shouldFetch ?? true,
  });

  return {
    report: data?.data,
    isFetchingReport: isFetching,
    errorReport: error,
    refetchReport: refetch,
  };
};
