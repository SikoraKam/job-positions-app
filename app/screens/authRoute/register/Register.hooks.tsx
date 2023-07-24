import { FC } from "react";
import { RegisterScreen } from "./Register.screen";
import { useForm } from "react-hook-form";
import { FormValues } from "./Register.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showToastError } from "../../../utils/toast";
import auth from "@react-native-firebase/auth";
import { registerUser } from "../../../services/api/auth.service";
import { useBoundStore } from "../../../store/useBoundStore";

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().required().email().required(),
    password: yup.string().required().min(6),
    passwordConfirmation: yup
      .string()
      .test("passwords-match", "Hasła muszą być identyczne", function (value) {
        return this.parent.password === value;
      }),
  })
  .required();

export const Register: FC = () => {
  const setCurrentUserUId = useBoundStore((state) => state.setCurrentUserUid);

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

  const onSubmit = async (data: FormValues) => {
    if (data.password !== data.passwordConfirmation) {
      showToastError("Hasła muszą być identyczne");
      return;
    }

    const uid = await registerUser(data.email, data.password, data.fullName);
    if (!uid) return;
    setCurrentUserUId(uid);
  };

  return (
    <RegisterScreen
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
