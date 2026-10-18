import { ProfileFormValues } from "@/schemas/settings/profile";
import { Control, FieldErrors } from "react-hook-form";
import { View } from "react-native";
import { AppButton } from "../shared/app-button";
import { FormInput } from "../shared/form-input";

interface Props {
  control: Control<ProfileFormValues>;
  errors?: FieldErrors<ProfileFormValues>;
  isUpdatingProfile: boolean;
  canSave: boolean;
  onSubmit: () => void;
}

export const AccountDetailsEdit = function ({
  control,
  errors,
  isUpdatingProfile,
  canSave,
  onSubmit,
}: Props) {
  return (
    <View className="gap-4">
      <FormInput
        label="First name"
        control={control}
        name="first_name"
        errors={errors}
      />
      <FormInput
        label="Last name"
        control={control}
        name="last_name"
        errors={errors}
      />

      <AppButton
        type="submit"
        isLoading={isUpdatingProfile}
        disabled={!canSave}
        onPress={onSubmit}
        label="Save changes"
        className="mt-1"
      />
    </View>
  );
};
