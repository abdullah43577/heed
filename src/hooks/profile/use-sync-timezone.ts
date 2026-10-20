import { useGetProfile } from "@/hooks/use-get-profile";
import { deviceTimeZone } from "@/utils/format-date";
import { useEffect, useRef } from "react";
import { useUpdateSettings } from "./use-update-settings";

// The report is sent at a local time, so the server follows the phone's timezone as it travels.
export const useSyncTimezone = function () {
  const { profile } = useGetProfile();
  const { updateSettings } = useUpdateSettings({ silent: true });
  const sentRef = useRef<string | null>(null);

  const timezone = deviceTimeZone();
  const serverTimezone = profile?.settings?.timezone;

  useEffect(() => {
    if (!profile || serverTimezone === timezone || sentRef.current === timezone) return;
    sentRef.current = timezone;
    updateSettings({ timezone });
  }, [profile, serverTimezone, timezone]);
};
