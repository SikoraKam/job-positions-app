import { FC, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationLightTheme, paperTheme } from "./theme/theme";
import { Router } from "./router/Router";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/shared/Toast/Toast";
import { useBoundStore } from "./store/useBoundStore";
import * as SplashScreen from "expo-splash-screen";
import { LoadingIndicator } from "./components/shared/LoadingIndicator/LoadingIndicator";
import { useSetup } from "./hooks/useSetup";

export const AppContainer: FC = () => {
  useSetup();
  const isAppInitialized = useBoundStore((state) => state.appInitialized);

  console.log("IS INITAILIZED", isAppInitialized);

  const onLayoutRootView = useCallback(async () => {
    if (isAppInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [isAppInitialized]);

  if (!isAppInitialized) {
    return <LoadingIndicator fullscreen />;
  }

  return (
    <>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer
          theme={NavigationLightTheme}
          onReady={onLayoutRootView}
        >
          <Router />
        </NavigationContainer>
      </PaperProvider>
      <Toast position="top" visibilityTime={3000} config={toastConfig} />
    </>
  );
};
