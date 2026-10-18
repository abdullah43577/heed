import { API_ENDPOINTS } from "@/provider/endpoints";
import { APIResponse } from "../../../types/response";
import { useSubmitData } from "../use-submit-data";

interface UseDisconnectMailAccountOptions {
  onSuccess?: () => void;
}

export const useDisconnectMailAccount = function ({
  onSuccess,
}: UseDisconnectMailAccountOptions = {}) {
  const { mutate, isPending } = useSubmitData<{ id: string }, APIResponse<null>>({
    url: ({ id }) => API_ENDPOINTS.mailAccounts.delete(id),
    getBody: () => undefined,
    method: "delete",
    onSuccessMessage: "Account disconnected",
    additionalQueryKeys: [[API_ENDPOINTS.mailAccounts.list]],
    onSuccess: () => onSuccess?.(),
  });

  return { disconnectMailAccount: mutate, isDisconnectingMailAccount: isPending };
};
