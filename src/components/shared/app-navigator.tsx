import { Stack } from "expo-router";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useOnboardingStore } from "@/store/onboarding";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useAuthStore } from "@/store/auth";
import { ErrorBoundary } from "./error-boundary";
import useNotifications from "@/hooks/use-notification";
import { StatusBar } from "expo-status-bar";
import { useSyncTheme, useTheme } from "@/hooks/use-theme";
import { useSyncDeviceToken } from "@/hooks/notifications/use-sync-device-token";

export const AppNavigator = function () {
  const [loaded] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });
  const { hasToken, isLoading: authLoading, checkAuthStatus } = useAuthStore();
  const { expoPushToken } = useNotifications();
  const { isFetchingProfile, profile } = useGetProfile();
  const isAuthenticated = !!profile && hasToken === true;

  useSyncTheme();
  useSyncDeviceToken(expoPushToken);
  const { scheme, colors } = useTheme();

  const {
    hasOnboarded,
    isLoading: onboardingLoading,
    checkOnboardingStatus,
  } = useOnboardingStore();

  useEffect(() => {
    checkAuthStatus();
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    const isReady =
      loaded && !authLoading && !onboardingLoading && !isFetchingProfile;
    if (isReady) SplashScreen.hideAsync();
  }, [loaded, authLoading, isFetchingProfile, onboardingLoading]);

  if (!loaded || authLoading || onboardingLoading) {
    return null;
  }

  return (
    <ErrorBoundary>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />

      <Stack screenOptions={{ contentStyle: { backgroundColor: colors.canvas } }}>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="oauth/callback" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated && hasOnboarded}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated && !hasOnboarded}>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </ErrorBoundary>
  );
};
