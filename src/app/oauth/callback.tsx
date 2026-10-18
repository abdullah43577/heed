import { API_ENDPOINTS } from "@/provider/endpoints";
import { queryClient } from "@/utils/queryClient";
import { useRouter } from "expo-router";
import { useEffect } from "react";

// Android can deliver the Gmail connect return link as a deep link as well as to
// openAuthSessionAsync; this route only absorbs it. The hook owns the toast.
export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: [API_ENDPOINTS.mailAccounts.list] });

    if (router.canGoBack()) router.back();
    else router.replace("/(dashboard)/(tabs)/profile/accounts");
  }, []);

  return null;
}
