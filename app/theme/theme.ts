import * as React from "react";
import {
  adaptNavigationTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import colors from "./colors";

export const paperTheme = {
  ...DefaultTheme,
  // Specify custom property
  colors: {
    ...colors,
    primary50: "#eff9ff",
    primary100: "#def3ff",
    primary200: "#b6e8ff",
    primary300: "#76d8ff",
    primary400: "#2dc5ff",
    primary500: "#02aff5",
    primary600: "#008bd2",
    primary700: "#006faa",
    primary800: "#006495",
    primary900: "#074d73",
    primary950: "#04314d",
    copy: {
      black: "#000000",
      gray: "rgb(107,107,104)",
    },
  },
  roundness: 2,
};

export type AppTheme = typeof paperTheme;
export const useAppTheme = () => useTheme<AppTheme>();

export const { LightTheme: NavigationLightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});
