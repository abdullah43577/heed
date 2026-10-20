import { API_ENDPOINTS } from "@/provider/endpoints";
import { BacklogRun, BacklogRunDetail, StartBacklogRunRequest } from "../../../types/backlog";
import { APIResponse } from "../../../types/response";
import { refreshMessageQueries } from "../messages/refresh-message-queries";
import { useSubmitData } from "../use-submit-data";

interface UseBacklogActionsOptions {
  onStarted?: (run: BacklogRun) => void;
}

export const useBacklogActions = function (options: UseBacklogActionsOptions = {}) {
  const { mutate: startBacklog, isPending: isStarting } = useSubmitData<
    StartBacklogRunRequest,
    APIResponse<BacklogRun>
  >({
    url: API_ENDPOINTS.backlog.start,
    onSuccessMessage: "Heed is going through your backlog",
    onSuccess: (response) => {
      refreshMessageQueries();
      options.onStarted?.(response.data);
    },
  });

  const { mutate: applyBacklog, isPending: isApplying } = useSubmitData<
    { id: string },
    APIResponse<BacklogRunDetail>
  >({
    url: ({ id }) => API_ENDPOINTS.backlog.apply(id),
    getBody: () => undefined,
    onSuccessMessage: "Marked as read in Gmail",
    onSuccess: () => refreshMessageQueries(),
  });

  const { mutate: cancelBacklog, isPending: isCancelling } = useSubmitData<
    { id: string },
    APIResponse<BacklogRunDetail>
  >({
    url: ({ id }) => API_ENDPOINTS.backlog.cancel(id),
    getBody: () => undefined,
    onSuccessMessage: "Tidy cancelled. Nothing in Gmail changed.",
    onSuccess: () => refreshMessageQueries(),
  });

  return {
    startBacklog,
    applyBacklog,
    cancelBacklog,
    isStarting,
    isApplying,
    isCancelling,
  };
};
