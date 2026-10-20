import { IN_FLIGHT_DRAFT_STATUSES } from "@/constants/drafts";
import { API_ENDPOINTS } from "@/provider/endpoints";
import { useEffect } from "react";
import { ReplyDraft } from "../../../types/draft";
import { APIResponse } from "../../../types/response";
import { useGetData } from "../use-get-data";

const POLL_MS = 1500;

interface UseGetDraftOptions {
  draftId: string;
  shouldFetch?: boolean;
}

export const useGetDraft = function (options: UseGetDraftOptions) {
  const shouldFetch = options.shouldFetch ?? true;
  const { data, isFetching, error, refetch } = useGetData<APIResponse<ReplyDraft>>({
    url: API_ENDPOINTS.drafts.detail(options.draftId),
    shouldFetch,
  });

  const draft = data?.data;
  const isInFlight = !!draft && IN_FLIGHT_DRAFT_STATUSES.includes(draft.status);

  // Watch a send through to SENT or FAILED; the server sends whether or not the screen stays open.
  useEffect(() => {
    if (!shouldFetch || !isInFlight) return;
    const timer = setInterval(() => refetch(), POLL_MS);
    return () => clearInterval(timer);
  }, [shouldFetch, isInFlight, refetch]);

  return {
    draft,
    isFetchingDraft: isFetching,
    errorDraft: error,
    refetchDraft: refetch,
  };
};
