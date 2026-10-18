import { Avatar } from "@/components/shared/avatar";
import { useGetProfile } from "@/hooks/use-get-profile";
import { View } from "react-native";
import { AppText } from "../shared/app-text";

export const ProfileHeader = function () {
  const { profile } = useGetProfile();

  const initials =
    `${profile?.first_name?.[0] ?? ""}${profile?.last_name?.[0] ?? ""}`.toUpperCase() ||
    "?";

  const fullName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    "Your profile";

  return (
    <View className="px-5 pt-2">
      <AppText type="display">Profile</AppText>

      <View className="mt-5 flex-row items-center gap-4 rounded-3xl border-hairline border-line bg-surface p-5">
        <Avatar
          initials={initials}
          size={64}
          textType="title"
          className="bg-surface-muted"
        />

        <View className="flex-1">
          <AppText
            type="default"
            className="font-inter-semibold text-base"
            numberOfLines={1}
          >
            {fullName}
          </AppText>
          <AppText type="caption" className="mt-0.5" numberOfLines={1}>
            {profile?.email}
          </AppText>
        </View>
      </View>
    </View>
  );
};
