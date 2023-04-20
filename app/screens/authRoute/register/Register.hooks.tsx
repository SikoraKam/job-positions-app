import { FC } from "react";
import { RegisterScreen } from "./Register.screen";
import { useForm } from "react-hook-form";
import { FormValues } from "./Register.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().required().email().required(),
    password: yup.string().required().min(5),
    passwordConfirmation: yup
      .string()
      .test("passwords-match", "Hasła muszą być identyczne", function (value) {
        return this.parent.password === value;
      }),
  })
  .required();

export const Register: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <RegisterScreen
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
