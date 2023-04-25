import { FC, useState } from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../hooks/useAuth";
import { LoadingIndicator } from "../components/shared/LoadingIndicator/LoadingIndicator";

export type DrawerScreensParamList = {
  Home: any;
};

const Stack = createStackNavigator();

export const Router: FC = () => {
  const { user, token, initializing } = useAuth();

  if (initializing) return <LoadingIndicator fullscreen />;
  return user ? <DrawerNavigator /> : <AuthStack />;
};
