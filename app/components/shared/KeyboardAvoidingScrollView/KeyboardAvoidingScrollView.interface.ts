import { ViewStyle } from "react-native";
import { ReactNode } from "react";

export interface KeyboardAvoidingScrollViewInterface {
  keyboardAvoidingViewClassname?: string;
  scrollViewClassname?: string;
  behaviour?: "height" | "padding" | "position" | undefined;
  children: ReactNode;
}
