import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationLightTheme, paperTheme } from "./theme/theme";
import { Router } from "./router/Router";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/shared/Toast/Toast";

export const AppContainer: FC = () => {
  return (
    <>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={NavigationLightTheme}>
          <Router />
        </NavigationContainer>
      </PaperProvider>
      <Toast position="top" visibilityTime={3000} config={toastConfig} />
    </>
  );
};
