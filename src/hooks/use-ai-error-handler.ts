import { isAiErrorCode } from "@/constants/ai";
import { showToast } from "@/utils/show-toast";
import type { AxiosError } from "axios";
import { useHandleErrors } from "./use-handle-errors";
import type { APIErrorBody } from "./use-submit-data";

// AI failure and quota are normal states (product rule 7): a warning saying what to do, never an error.
export const useAiErrorHandler = function (warningCodes: string[] = []) {
  const handleErrors = useHandleErrors();

  return function (error: AxiosError<APIErrorBody>) {
    const code = error.response?.data?.code;
    if (isAiErrorCode(code) || (code && warningCodes.includes(code))) {
      showToast("warning", error.response?.data?.message ?? "Heed couldn't do that right now. Try again in a moment.");
      return;
    }
    handleErrors(error);
  };
};
