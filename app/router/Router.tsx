import { FC } from "react";
import { DrawerNavigator } from "./DrawerNavigator";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../hooks/useAuth";
import { LoadingIndicator } from "../components/shared/LoadingIndicator/LoadingIndicator";

export const Router: FC = () => {
  const { user, token, initializing } = useAuth();

  if (initializing) return <LoadingIndicator fullscreen />;
  return user ? <DrawerNavigator /> : <AuthStack />;
};
