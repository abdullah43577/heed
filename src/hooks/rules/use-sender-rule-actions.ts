import { RULE_KIND_META } from "@/constants/rules";
import { API_ENDPOINTS } from "@/provider/endpoints";
import { showToast } from "@/utils/show-toast";
import { APIResponse } from "../../../types/response";
import { CreateSenderRuleRequest, SenderRule } from "../../../types/sender-rule";
import { useSubmitData } from "../use-submit-data";
import { refreshRuleQueries } from "./refresh-rule-queries";

interface UseSenderRuleActionsOptions {
  onSaved?: (rule: SenderRule) => void;
  onDeleted?: () => void;
}

export const useSenderRuleActions = function (options: UseSenderRuleActionsOptions = {}) {
  const { mutate: saveRule, isPending: isSavingRule } = useSubmitData<CreateSenderRuleRequest, APIResponse<SenderRule>>({
    url: API_ENDPOINTS.rules.create,
    silent: true,
    onSuccess: (response) => {
      showToast("success", `${RULE_KIND_META[response.data.kind].label}: ${response.data.pattern}`);
      refreshRuleQueries();
      options.onSaved?.(response.data);
    },
  });

  const { mutate: deleteRule, isPending: isDeletingRule } = useSubmitData<{ id: string }, APIResponse<null>>({
    url: ({ id }) => API_ENDPOINTS.rules.delete(id),
    method: "delete",
    getBody: () => undefined,
    onSuccessMessage: "Rule removed",
    onSuccess: () => {
      refreshRuleQueries();
      options.onDeleted?.();
    },
  });

  return { saveRule, deleteRule, isSavingRule, isDeletingRule };
};
