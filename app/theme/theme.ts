import * as React from "react";
import {
  adaptNavigationTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import colors from "./colors";

export const paperTheme = {
  ...DefaultTheme,
  // Specify custom property
  colors: colors,
  roundness: 2,
};

export const { LightTheme: NavigationLightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});
