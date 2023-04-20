import { FC } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Login } from "../screens/authRoute/login/Login.hooks";
import { Register } from "../screens/authRoute/register/Register.hooks";

const Stack = createStackNavigator<AuthScreenStackParamList>();

export type AuthScreenStackParamList = {
  Register: undefined;
  Login: undefined;
};

export type AuthStackNavigatorType =
  StackNavigationProp<AuthScreenStackParamList>;

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Register"} component={Register} />
    </Stack.Navigator>
  );
};
