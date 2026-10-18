import { CONNECT_ERROR_MESSAGES } from "@/constants/mail-accounts";
import { API_ENDPOINTS } from "@/provider/endpoints";
import { queryClient } from "@/utils/queryClient";
import { showToast } from "@/utils/show-toast";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
  ConnectMailAccountRequest,
  ConnectMailAccountResponse,
} from "../../../types/mail-account";
import { APIResponse } from "../../../types/response";
import { useSubmitData } from "../use-submit-data";

// heed:// in a build, exp:// in Expo Go; the server sends the browser back here.
const callbackUrl = () => Linking.createURL("oauth/callback");

const handleReturn = function (url: string) {
  const { queryParams } = Linking.parse(url);
  const status = queryParams?.status;
  const code = typeof queryParams?.code === "string" ? queryParams.code : "OAUTH_FAILED";

  if (status === "connected") {
    showToast("success", `Connected ${queryParams?.email ?? "your Gmail"}`);
    return;
  }

  const message = CONNECT_ERROR_MESSAGES[code];
  if (message) showToast("warning", message);
};

export const useConnectMailAccount = function () {
  const [isInBrowser, setIsInBrowser] = useState(false);

  const { mutate, isPending } = useSubmitData<
    ConnectMailAccountRequest,
    APIResponse<ConnectMailAccountResponse>
  >({
    url: API_ENDPOINTS.mailAccounts.connect,
    method: "post",
    silent: true,
    onSuccess: async (response) => {
      setIsInBrowser(true);

      try {
        const result = await WebBrowser.openAuthSessionAsync(response.data.url, callbackUrl());
        if (result.type === "success") handleReturn(result.url);
      } finally {
        setIsInBrowser(false);
        queryClient.refetchQueries({ queryKey: [API_ENDPOINTS.mailAccounts.list] });
      }
    },
  });

  const connectMailAccount = function (loginHint?: string) {
    mutate({
      returnUrl: callbackUrl(),
      ...(loginHint && { loginHint }),
    });
  };

  return { connectMailAccount, isConnectingMailAccount: isPending || isInBrowser };
};
