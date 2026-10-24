import { EmptyState } from "@/components/shared/empty-state";

interface Props {
  subtitle: string;
  onConnect: () => void;
}

export const NoAccountState = function ({ subtitle, onConnect }: Props) {
  return (
    <EmptyState
      illustration="emptyAccounts"
      title="Connect your Gmail"
      subtitle={subtitle}
      buttonText="Connect Gmail"
      onButtonPress={onConnect}
    />
  );
};
