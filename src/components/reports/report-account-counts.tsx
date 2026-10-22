import { AppText } from "@/components/shared/app-text";
import { SectionHeader } from "@/components/shared/section-header";
import { accountColor } from "@/utils/account-color";
import { View } from "react-native";
import { ReportAccountTotals } from "../../../types/report";

interface Props {
  accounts: ReportAccountTotals[];
}

export const ReportAccountCounts = function ({ accounts }: Props) {
  if (accounts.length === 0) return null;

  return (
    <View>
      <SectionHeader title="By account" />

      <View className="overflow-hidden rounded-xl border-hairline border-line bg-surface">
        {accounts.map((account, index) => {
          const color = accountColor(account.email);

          return (
            <View key={account.mailAccountId}>
              {index > 0 && <View className="ml-[58px] h-px bg-line" />}
              <View className="flex-row items-center gap-3 px-4 py-3">
                <View
                  className="items-center justify-center rounded-full"
                  style={{ width: 26, height: 26, backgroundColor: `${color}1F` }}
                >
                  <AppText type="caption" className="font-inter-semibold" style={{ color }}>
                    {account.email[0]?.toUpperCase()}
                  </AppText>
                </View>
                <AppText type="default" numberOfLines={1} className="flex-1">
                  {account.email}
                </AppText>
                <AppText type="caption">
                  {account.read} of {account.total} read
                </AppText>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
