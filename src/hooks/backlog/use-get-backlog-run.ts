import { BACKLOG_WORKING_STATUSES } from "@/constants/backlog";
import { API_ENDPOINTS } from "@/provider/endpoints";
import { useEffect } from "react";
import { BacklogRunDetail } from "../../../types/backlog";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

const POLL_MS = 3000;

interface UseGetBacklogRunOptions {
  runId: string;
  shouldFetch?: boolean;
}

export const useGetBacklogRun = function (options: UseGetBacklogRunOptions) {
  const shouldFetch = options.shouldFetch ?? true;
  const { data, isFetching, error, refetch } = useGetData<APIResponse<BacklogRunDetail>>({
    url: API_ENDPOINTS.backlog.detail(options.runId),
    shouldFetch,
  });

  const run = data?.data;
  const isWorking = !!run && BACKLOG_WORKING_STATUSES.includes(run.status);

  // The server does the work on its own clock; the screen only watches while it is under way.
  useEffect(() => {
    if (!shouldFetch || !isWorking) return;
    const timer = setInterval(() => refetch(), POLL_MS);
    return () => clearInterval(timer);
  }, [shouldFetch, isWorking, refetch]);

  return {
    backlogRun: run,
    isFetchingBacklogRun: isFetching,
    errorBacklogRun: error,
    refetchBacklogRun: refetch,
  };
};
