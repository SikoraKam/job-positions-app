import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationLightTheme, paperTheme } from "./theme/theme";
import { Router } from "./router/Router";

export const AppContainer: FC = () => {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={NavigationLightTheme}>
        <Router />
      </NavigationContainer>
    </PaperProvider>
  );
};
