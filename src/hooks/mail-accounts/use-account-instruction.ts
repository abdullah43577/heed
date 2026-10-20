import { API_ENDPOINTS } from "@/provider/endpoints";
import { MailAccount } from "../../../types/mail-account";
import { APIResponse } from "../../../types/response";
import { useSubmitData } from "../use-submit-data";

export const useAccountInstruction = function () {
  const { mutate, isPending } = useSubmitData<{ id: string; instruction: string | null }, APIResponse<MailAccount>>({
    url: ({ id }) => API_ENDPOINTS.mailAccounts.update(id),
    method: "patch",
    getBody: ({ instruction }) => ({ instruction }),
    onSuccessMessage: "Instructions saved",
    additionalQueryKeys: [[API_ENDPOINTS.mailAccounts.list]],
  });

  return { saveInstruction: mutate, isSavingInstruction: isPending };
};
