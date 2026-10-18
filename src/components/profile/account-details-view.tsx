import { useGetProfile } from "@/hooks/use-get-profile";
import { SettingsRow } from "./settings-row";

export const AccountDetailsView = function () {
  const { profile } = useGetProfile();

  return (
    <>
      <SettingsRow label="First name" value={profile?.first_name ?? "Not set"} withDivider />
      <SettingsRow label="Last name" value={profile?.last_name ?? "Not set"} withDivider />
    </>
  );
};
