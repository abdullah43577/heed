import { useThemeColors } from "@/hooks/use-theme-colors";
import { AccountDetailsEdit } from "@/components/profile/account-details-edit";
import { AccountDetailsView } from "@/components/profile/account-details-view";
import { AccountPreferencesCard } from "@/components/profile/account-preferences-card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { SettingsCard } from "@/components/profile/settings-card";
import { SettingsRow } from "@/components/profile/settings-row";
import { AppText } from "@/components/shared/app-text";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { ScreenHeader } from "@/components/shared/screen-header";
import { DeleteAccountDialog } from "@/components/profile/delete-account-dialog";
import { useDeleteAccount } from "@/hooks/profile/use-delete-account";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile";
import { useUpdateSettings } from "@/hooks/profile/use-update-settings";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useGetUnreadCount } from "@/hooks/notifications/use-get-unread-count";
import { useGetMailAccounts } from "@/hooks/mail-accounts/use-get-mail-accounts";
import { useTheme } from "@/hooks/use-theme";
import { DEFAULT_REPORT_TIME } from "@/constants/reports";
import { ThemePreference } from "@/constants/theme";
import { formatTimeOfDay } from "@/utils/format-date";
import { ProfileFormValues, profileSchema } from "@/schemas/settings/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { FileText, LogOut, Mail, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { foreground } = useThemeColors();
  const { unreadCount } = useGetUnreadCount();
  const { mailAccounts } = useGetMailAccounts();
  const needsReconnect = mailAccounts.some((account) => account.status === "NEEDS_REAUTH");

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
    <SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
      <ScreenHeader title="Profile" />

      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-5 pb-8 pt-4"
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

          <SettingsCard
            title="Account details"
            actionLabel={isEditing ? "Cancel" : "Edit"}
            onPressAction={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? (
              <View className="border-t-hairline border-line p-3.5">
                <AccountDetailsEdit
                  control={control}
                  errors={errors}
                  isUpdatingProfile={isUpdatingProfile}
                  canSave={canSave}
                  onSubmit={handleSubmit(onSubmit)}
                />
              </View>
            ) : (
              <AccountDetailsView />
            )}
          </SettingsCard>

          <SettingsCard title="Mail">
            <SettingsRow
              label="Gmail accounts"
              icon={Mail}
              withDivider
              value={needsReconnect ? "Reconnect needed" : `${mailAccounts.length} connected`}
              onPress={() => router.push("/(dashboard)/(tabs)/profile/accounts")}
            />
            <SettingsRow
              label="Daily report"
              icon={FileText}
              withDivider
              value={formatTimeOfDay(profile?.settings?.reportTime ?? DEFAULT_REPORT_TIME)}
              onPress={() => router.push("/(dashboard)/(tabs)/profile/report-settings")}
            />
          </SettingsCard>

          <AccountPreferencesCard
            theme={preference}
            onThemeChange={handleThemeChange}
            isUpdatingSettings={isUpdatingSettings}
            onNotificationsToggle={handleNotificationsToggle}
            unreadCount={unreadCount}
            onOpenNotifications={() => router.push("/(dashboard)/(tabs)/profile/notifications")}
          />

          <SettingsCard>
            <SettingsRow label="Log out" icon={LogOut} withDivider onPress={() => setLogoutDialogVisible(true)} />
            <SettingsRow
              label="Delete account"
              icon={Trash2}
              destructive
              withDivider
              onPress={() => setDeleteDialogVisible(true)}
            />
          </SettingsCard>

          <AppText type="caption" className="text-center">
            Heed v{Constants.expoConfig?.version ?? "1.0.0"}
          </AppText>
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
