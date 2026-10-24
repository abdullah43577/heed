import { BacklogStep } from "@/components/setup/backlog-step";
import { ConnectStep } from "@/components/setup/connect-step";
import { NotificationsStep } from "@/components/setup/notifications-step";
import { ReportStep } from "@/components/setup/report-step";
import { SetupProgress } from "@/components/setup/setup-progress";
import { StyleStep } from "@/components/setup/style-step";
import { AppButton } from "@/components/shared/app-button";
import { AppText } from "@/components/shared/app-text";
import { BottomSheetPicker } from "@/components/shared/bottom-sheet-picker";
import { DEFAULT_REPORT_TIME, REPORT_TIME_OPTIONS } from "@/constants/reports";
import { useBacklogActions } from "@/hooks/backlog/use-backlog-actions";
import { useConnectMailAccount } from "@/hooks/mail-accounts/use-connect-mail-account";
import { useGetMailAccounts } from "@/hooks/mail-accounts/use-get-mail-accounts";
import { useWritingStyle } from "@/hooks/mail-accounts/use-writing-style";
import { usePushPermission } from "@/hooks/notifications/use-push-permission";
import { useUpdateSettings } from "@/hooks/profile/use-update-settings";
import { useGetProfile } from "@/hooks/use-get-profile";
import { useSetupStore } from "@/store/setup";
import { deviceTimeZone } from "@/utils/format-date";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BacklogWindow } from "../../../types/backlog";
import { MailAccount } from "../../../types/mail-account";

const STEP_ORDER = ["connect", "backlog", "report", "notifications", "style"] as const;
type SetupStep = (typeof STEP_ORDER)[number];
const NEEDS_ACCOUNT: SetupStep[] = ["backlog", "style"];

const newestActiveAccount = (accounts: MailAccount[]) =>
  accounts
    .filter((account) => account.status === "ACTIVE")
    .sort((a, b) => b.connectedAt.localeCompare(a.connectedAt))[0] ?? null;

export default function Setup() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [windowDays, setWindowDays] = useState<BacklogWindow>(30);
  const [hasStartedBacklog, setHasStartedBacklog] = useState(false);
  const [wasPushDeclined, setWasPushDeclined] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const { mailAccounts } = useGetMailAccounts();
  const { connectMailAccount, isConnectingMailAccount } = useConnectMailAccount();
  const { startBacklog, isStarting } = useBacklogActions({ onStarted: () => setHasStartedBacklog(true) });
  const { learnStyle, isLearningStyle } = useWritingStyle();
  const { isGranted, isRequesting, requestPermission } = usePushPermission();
  const { profile } = useGetProfile();
  const { updateSettings, isUpdatingSettings } = useUpdateSettings({ silent: true });
  const completeSetup = useSetupStore((state) => state.completeSetup);

  const account = newestActiveAccount(mailAccounts);
  const steps = STEP_ORDER.filter((step) => !!account || !NEEDS_ACCOUNT.includes(step));
  const currentIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[currentIndex]!;
  const isLastStep = currentIndex === steps.length - 1;
  const reportTime = profile?.settings?.reportTime ?? DEFAULT_REPORT_TIME;

  const isStepDone: Record<SetupStep, boolean> = {
    connect: !!account,
    backlog: hasStartedBacklog,
    report: true,
    notifications: isGranted === true,
    style: !!account?.styleNote,
  };

  const finish = async function () {
    await completeSetup();
    router.back();
  };

  const handleNext = function () {
    if (isLastStep) {
      finish();
      return;
    }

    setStepIndex(currentIndex + 1);
  };

  const handleStartBacklog = function () {
    if (account) startBacklog({ mailAccountId: account.id, windowDays });
  };

  const handleEnablePush = async function () {
    const granted = await requestPermission();
    setWasPushDeclined(!granted);
  };

  const handleSelectTime = function (value: string) {
    setPickerVisible(false);
    if (value !== reportTime) updateSettings({ reportTime: value, timezone: deviceTimeZone() });
  };

  const isDone = isStepDone[step];
  const nextLabel = isLastStep ? "Start using Heed" : "Continue";
  const laterLabel = step === "connect" ? "I'll do this later" : "Not now";

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="h-14 flex-row items-center gap-4 px-5">
        <View className="flex-1">
          <SetupProgress total={steps.length} activeIndex={currentIndex} />
        </View>

        {!isLastStep && (
          <Pressable onPress={finish} hitSlop={8} className="active:opacity-60">
            <AppText type="link">Skip</AppText>
          </Pressable>
        )}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {step === "connect" && (
          <ConnectStep
            mailAccounts={mailAccounts}
            onConnect={() => connectMailAccount()}
            isConnecting={isConnectingMailAccount}
          />
        )}

        {step === "backlog" && account && (
          <BacklogStep
            email={account.email}
            windowDays={windowDays}
            onWindowChange={setWindowDays}
            onStart={handleStartBacklog}
            isStarting={isStarting}
            hasStarted={hasStartedBacklog}
          />
        )}

        {step === "report" && (
          <ReportStep
            reportTime={reportTime}
            timezone={deviceTimeZone()}
            onPressTime={() => setPickerVisible(true)}
            disabled={isUpdatingSettings || !profile}
          />
        )}

        {step === "notifications" && (
          <NotificationsStep
            isGranted={isGranted}
            wasDeclined={wasPushDeclined}
            isRequesting={isRequesting}
            onEnable={handleEnablePush}
          />
        )}

        {step === "style" && account && (
          <StyleStep
            email={account.email}
            styleNote={account.styleNote}
            onLearn={() => learnStyle({ id: account.id })}
            isLearning={isLearningStyle}
          />
        )}
      </ScrollView>

      <View className="px-5 pb-4 pt-2">
        {isDone ? (
          <AppButton type="submit" label={nextLabel} onPress={handleNext} />
        ) : (
          <AppButton type="ghost" label={laterLabel} onPress={handleNext} />
        )}
      </View>

      <BottomSheetPicker
        visible={pickerVisible}
        title="Send the report at"
        selectedValue={reportTime}
        options={REPORT_TIME_OPTIONS}
        onSelect={handleSelectTime}
        onClose={() => setPickerVisible(false)}
        showSearch={false}
      />
    </SafeAreaView>
  );
}
