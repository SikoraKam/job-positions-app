import { FC } from "react";
import { RegisterScreenProps } from "./Register.interface";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import { CustomInput } from "../../../components/shared/CustomInput/CustomInput";
import { Button } from "react-native-paper";
import { ContentContainer } from "../../../components/shared/ContentContainer/ContentContainer";

export const RegisterScreen: FC<RegisterScreenProps> = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
}) => {
  return (
    <ContentContainer title="Stwórz konto" withScroll>
      <View className="mt-12" style={{ gap: 8 }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Imię i nazwisko"
              error={errors.fullName}
              errorLabel={errors.fullName?.message}
            />
          )}
          name="fullName"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="E-mail"
              error={errors.email}
              errorLabel={errors.email?.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Hasło"
              error={errors.password}
              errorLabel={errors.password?.message}
              secure
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Powtórz hasło"
              error={errors.passwordConfirmation}
              errorLabel={errors.passwordConfirmation?.message}
              secure
            />
          )}
          name="passwordConfirmation"
        />
      </View>

      <View className="mt-12 border">
        <Button
          className="py-1"
          mode="contained"
          icon="login"
          onPress={handleSubmit(onSubmit)}
        >
          Zarejestruj
        </Button>
      </View>
    </ContentContainer>
  );
};
