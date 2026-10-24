import { useGetMailAccounts } from "@/hooks/mail-accounts/use-get-mail-accounts";
import { useSetupStore } from "@/store/setup";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

// Setup is offered once over Review, never to someone who already has an inbox connected.
export const useFirstRunSetup = function () {
  const router = useRouter();
  const { hasCompletedSetup, isLoading, checkSetupStatus } = useSetupStore();
  const { mailAccounts, hasLoadedMailAccounts } = useGetMailAccounts();
  const hasOffered = useRef(false);

  useEffect(() => {
    checkSetupStatus();
  }, [checkSetupStatus]);

  useEffect(() => {
    if (hasOffered.current || isLoading || !hasLoadedMailAccounts) return;
    if (hasCompletedSetup || mailAccounts.length > 0) return;

    hasOffered.current = true;
    router.push("/(dashboard)/setup");
  }, [hasCompletedSetup, isLoading, hasLoadedMailAccounts, mailAccounts.length, router]);
};
