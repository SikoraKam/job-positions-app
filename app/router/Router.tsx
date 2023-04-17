import { FC, useState } from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { AuthStack } from "./AuthStack";

export type DrawerScreensParamList = {
  Home: any;
};

const Stack = createStackNavigator();

export const Router: FC = () => {
  const [user, setUser] = useState(null);

  return user ? <DrawerNavigator /> : <AuthStack />;
};
