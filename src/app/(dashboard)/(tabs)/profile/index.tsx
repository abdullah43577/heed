import { useThemeColors } from "@/hooks/use-theme-colors";
import { AccountDetailsEdit } from "@/components/profile/account-details-edit";
import { AccountDetailsView } from "@/components/profile/account-details-view";
import { AccountPreferencesCard } from "@/components/profile/account-preferences-card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { SettingsCard } from "@/components/profile/settings-card";
import { SettingsRow } from "@/components/profile/settings-row";
import { AppText } from "@/components/shared/app-text";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DeleteAccountDialog } from "@/components/profile/delete-account-dialog";
import { useDeleteAccount } from "@/hooks/profile/use-delete-account";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile";
import { useUpdateSettings } from "@/hooks/profile/use-update-settings";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useGetUnreadCount } from "@/hooks/notifications/use-get-unread-count";
import { useTheme } from "@/hooks/use-theme";
import { ThemePreference } from "@/constants/theme";
import { ProfileFormValues, profileSchema } from "@/schemas/settings/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { foreground } = useThemeColors();
  const { unreadCount } = useGetUnreadCount();

  const { profile, isFetchingProfile, refetch, logout } = useGetProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { first_name: "", last_name: "" },
  });

  useEffect(() => {
    if (profile) {
      reset({
        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",
      });
    }
  }, [profile]);

  const { updateProfile, isUpdatingProfile } = useUpdateProfile({
    onSuccess: () => setIsEditing(false),
  });

  const { updateSettings, isUpdatingSettings } = useUpdateSettings();
  const { preference, setPreference } = useTheme();

  const canSave = isDirty && !isUpdatingProfile;

  const onSubmit = (values: ProfileFormValues) => updateProfile(values);

  const handleThemeChange = function (theme: ThemePreference) {
    setPreference(theme);
    updateSettings({ theme });
  };

  const handleNotificationsToggle = (notifications: boolean) =>
    updateSettings({ notifications });

  const handleLogout = function () {
    setLogoutDialogVisible(false);
    logout();
  };

  // Through logout(), which also wipes the persisted cache of the deleted data.
  const { deleteAccount, isDeletingAccount } = useDeleteAccount({
    onSuccess: () => {
      setDeleteDialogVisible(false);
      logout();
    },
  });

  const handleDeleteAccount = function (password: string) {
    deleteAccount({ password });
  };

  if (isFetchingProfile && !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas">
        <ActivityIndicator color={foreground} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isFetchingProfile}
            onRefresh={() => refetch()}
          />
        }
      >
        <ProfileHeader />

        <View className="gap-4 px-5 pt-4">
          <SettingsCard
            title="Account details"
            actionLabel={isEditing ? "Cancel" : "Edit"}
            onPressAction={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? (
              <View className="px-5 pb-5 pt-4">
                <AccountDetailsEdit
                  control={control}
                  errors={errors}
                  isUpdatingProfile={isUpdatingProfile}
                  canSave={canSave}
                  onSubmit={handleSubmit(onSubmit)}
                />
              </View>
            ) : (
              <View className="mt-4">
                <AccountDetailsView />
              </View>
            )}
          </SettingsCard>

          <AccountPreferencesCard
            theme={preference}
            onThemeChange={handleThemeChange}
            isUpdatingSettings={isUpdatingSettings}
            onNotificationsToggle={handleNotificationsToggle}
            unreadCount={unreadCount}
            onOpenNotifications={() => router.push("/(dashboard)/(tabs)/profile/notifications")}
          />

          <View className="overflow-hidden rounded-3xl border-hairline border-line bg-surface">
            <SettingsRow
              label="Log out"
              destructive
              onPress={() => setLogoutDialogVisible(true)}
            />
          </View>

          <View className="overflow-hidden rounded-3xl border-hairline border-line bg-surface">
            <SettingsRow
              label="Delete account"
              destructive
              onPress={() => setDeleteDialogVisible(true)}
            />
          </View>

          <AppText type="caption" className="mt-1 text-center text-foreground-subtle">
            Heed v{Constants.expoConfig?.version ?? "1.0.0"}
          </AppText>
        </View>
      </KeyboardAwareScrollView>

      <DeleteAccountDialog
        visible={deleteDialogVisible}
        isDeleting={isDeletingAccount}
        onConfirm={handleDeleteAccount}
        onCancel={() => setDeleteDialogVisible(false)}
      />

      <ConfirmDialog
        visible={logoutDialogVisible}
        title="Log out"
        message="Are you sure you want to log out of your account?"
        confirmLabel="Log out"
        variant="delete"
        onConfirm={handleLogout}
        onCancel={() => setLogoutDialogVisible(false)}
      />
    </SafeAreaView>
  );
}
