import { ReactNode } from "react";
import { TextProps } from "react-native";

export interface CustomTextProps {
  size?: typeof TextSizeTypes[number];
  weight?: typeof TextWeightTypes[number];
  textClassName?: TextProps["style"];
  children?: ReactNode;
  onPress?: VoidFunction;
  numberOfLines?: number;
}

export const TextSizeTypes = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
] as const;

export const TextWeightTypes = [
  "light",
  "normal",
  "medium",
  "semibold",
] as const;
