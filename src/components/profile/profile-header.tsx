import { Avatar } from "@/components/shared/avatar";
import { useGetProfile } from "@/hooks/use-get-profile";
import { View } from "react-native";
import { AppText } from "../shared/app-text";

export const ProfileHeader = function () {
  const { profile } = useGetProfile();

  const initials = `${profile?.first_name?.[0] ?? ""}${profile?.last_name?.[0] ?? ""}`.toUpperCase() || "?";
  const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "Your profile";

  return (
    <View className="flex-row items-center gap-3 rounded-xl border-hairline border-line bg-surface p-3.5">
      <Avatar initials={initials} size={48} className="bg-accent-muted" />

      <View className="flex-1">
        <AppText type="label" numberOfLines={1}>
          {fullName}
        </AppText>
        <AppText type="subtitle" numberOfLines={1}>
          {profile?.email}
        </AppText>
      </View>
    </View>
  );
};
