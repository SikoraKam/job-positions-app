import { FC } from "react";
import { LoginScreenInterface } from "./Login.interface";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { ContentContainer } from "../../../components/shared/ContentContainer/ContentContainer";
import { CustomInput } from "../../../components/shared/CustomInput/CustomInput";
import { Controller } from "react-hook-form";

export const LoginScreen: FC<LoginScreenInterface> = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
}) => (
  <ContentContainer title="Login" withBackButton={false}>
    <View className="mt-12" style={{ gap: 8 }}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            label="E-mail"
            error={errors.email}
            errorLabel="Email error"
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            label="Password"
            error={errors.email}
            errorLabel="Password error"
            secure
          />
        )}
        name="password"
      />
    </View>

    <View className="flex-1 justify-end pb-12">
      <Button
        className="py-1"
        mode="contained"
        icon="login"
        onPress={handleSubmit(onSubmit)}
      >
        Zaloguj
      </Button>
    </View>
  </ContentContainer>
);
