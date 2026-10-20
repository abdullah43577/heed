import { useSubmitData } from "@/hooks/use-submit-data";
import { API_ENDPOINTS } from "@/provider/endpoints";
import { UserSettings } from "../../../types/auth";
import { APIResponse } from "../../../types/response";

type UpdateSettingsPayload = Partial<
  Pick<UserSettings, "theme" | "notifications" | "reportTime" | "timezone">
>;

export const useUpdateSettings = function (options?: { silent?: boolean }) {
  const { mutate, isPending } = useSubmitData<
    UpdateSettingsPayload,
    APIResponse<UserSettings>
  >({
    url: API_ENDPOINTS.auth.updateSettings,
    method: "post",
    onSuccessMessage: "Preferences updated",
    additionalQueryKeys: [[API_ENDPOINTS.auth.getProfile]],
    silent: options?.silent ?? false,
  });

  return { updateSettings: mutate, isUpdatingSettings: isPending };
};
