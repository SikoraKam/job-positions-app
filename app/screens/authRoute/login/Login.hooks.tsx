import { FC } from "react";
import { LoginScreen } from "./Login.screen";
import { useForm } from "react-hook-form";
import { FormValues } from "./Login.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
  AuthScreenStackParamList,
  AuthStackNavigatorType,
} from "../../../router/AuthStack";
import { loginUser } from "../../../services/api/auth.service";
import { useBoundStore } from "../../../store/useBoundStore";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
  })
  .required();

export const Login: FC = () => {
  const { navigate } = useNavigation<AuthStackNavigatorType>();
  const setCurrentUserUId = useBoundStore((state) => state.setCurrentUserUid);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigateToRegistration = () => navigate("Register");

  const onSubmit = async (data: FormValues) => {
    const uid = await loginUser(data.email, data.password);
    if (!uid) return;
    setCurrentUserUId(uid);
  };

  return (
    <LoginScreen
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      control={control}
      navigateToRegistration={navigateToRegistration}
    />
  );
};
