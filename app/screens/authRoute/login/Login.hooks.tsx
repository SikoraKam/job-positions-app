import { FC } from "react";
import { LoginScreen } from "./Login.screen";
import { useForm } from "react-hook-form";
import { FormValues } from "./Login.interface";

export const Login: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <LoginScreen
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      control={control}
    />
  );
};
