import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/authRoute/login/Login.screen";
import { Login } from "../screens/authRoute/login/Login.hooks";

const Stack = createStackNavigator();

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"login"} component={Login} />
    </Stack.Navigator>
  );
};
