import * as React from "react";
import {
  adaptNavigationTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

export const paperTheme = {
  ...DefaultTheme,
  // Specify custom property
  colors: {
    primary: "rgb(0, 102, 138)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(196, 231, 255)",
    onPrimaryContainer: "rgb(0, 30, 44)",
    secondary: "rgb(0, 100, 150)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(204, 229, 255)",
    onSecondaryContainer: "rgb(0, 30, 49)",
    tertiary: "rgb(0, 99, 154)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(206, 229, 255)",
    onTertiaryContainer: "rgb(0, 29, 50)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(251, 252, 255)",
    onBackground: "rgb(25, 28, 30)",
    surface: "rgb(251, 252, 255)",
    onSurface: "rgb(25, 28, 30)",
    surfaceVariant: "rgb(221, 227, 234)",
    onSurfaceVariant: "rgb(65, 72, 77)",
    outline: "rgb(113, 120, 126)",
    outlineVariant: "rgb(192, 199, 205)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 51)",
    inverseOnSurface: "rgb(240, 241, 243)",
    inversePrimary: "rgb(124, 208, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 245, 249)",
      level2: "rgb(231, 240, 246)",
      level3: "rgb(223, 236, 242)",
      level4: "rgb(221, 234, 241)",
      level5: "rgb(216, 231, 239)",
    },
    surfaceDisabled: "rgba(25, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 30, 0.38)",
    backdrop: "rgba(42, 49, 54, 0.4)",
  },
};

export const { LightTheme: NavigationLightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});
