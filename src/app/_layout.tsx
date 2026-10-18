import "@/global.css";
import { AppNavigator } from "@/components/shared/app-navigator";
import { OfflineBanner } from "@/components/shared/offline-banner";
import { UpdatePrompt } from "@/components/shared/update-prompt";
import { useOnlineManager } from "@/hooks/use-online-status";
import { CACHE_BUSTER, queryPersister } from "@/provider/query-persister";
import { toastConfig } from "@/provider/toast-config";
import { queryClient } from "@/utils/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 3000, fade: true });

export default function RootLayout() {
  useOnlineManager();

  return (
    <SafeAreaProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: queryPersister,
            maxAge: 1000 * 60 * 60 * 24,
            buster: CACHE_BUSTER,
            dehydrateOptions: {
              shouldDehydrateQuery: (query) => query.state.status === "success",

              // useSubmitData's inline mutationFn has no mutationKey and cannot be
              // serialised, so a restored mutation would stay paused forever.
              shouldDehydrateMutation: () => false,
            },
          }}
          onSuccess={() => queryClient.resumePausedMutations()}
        >
          <AppNavigator />
          <OfflineBanner />
          <UpdatePrompt />
          <Toast config={toastConfig} />
        </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
