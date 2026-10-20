import { API_ENDPOINTS } from "@/provider/endpoints";
import { MailAccount } from "../../../types/mail-account";
import { APIResponse } from "../../../types/response";
import { useAiErrorHandler } from "../use-ai-error-handler";
import { useSubmitData } from "../use-submit-data";

interface UseWritingStyleOptions {
  onSaved?: () => void;
}

export const useWritingStyle = function (options: UseWritingStyleOptions = {}) {
  const onError = useAiErrorHandler(["NOT_ENOUGH_SENT_MAIL", "ACCOUNT_NEEDS_REAUTH"]);

  const { mutate: learnStyle, isPending: isLearningStyle } = useSubmitData<{ id: string }, APIResponse<MailAccount>>({
    url: ({ id }) => API_ENDPOINTS.mailAccounts.learnStyle(id),
    getBody: () => undefined,
    onLoadingMessage: "Reading your sent mail…",
    onSuccessMessage: "Heed learned how you write",
    additionalQueryKeys: [[API_ENDPOINTS.mailAccounts.list]],
    onError,
  });

  const { mutate: saveStyleNote, isPending: isSavingStyleNote } = useSubmitData<
    { id: string; styleNote: string | null },
    APIResponse<MailAccount>
  >({
    url: ({ id }) => API_ENDPOINTS.mailAccounts.update(id),
    method: "patch",
    getBody: ({ styleNote }) => ({ styleNote }),
    onSuccessMessage: "Writing style saved",
    additionalQueryKeys: [[API_ENDPOINTS.mailAccounts.list]],
    onError,
    onSuccess: () => options.onSaved?.(),
  });

  return { learnStyle, isLearningStyle, saveStyleNote, isSavingStyleNote };
};
