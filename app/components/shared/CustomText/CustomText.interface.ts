import { ReactNode } from "react";
import { TextProps } from "react-native";
import { VariantProp } from "react-native-paper/lib/typescript/src/components/Typography/types";

export interface CustomTextProps {
  size?: typeof TextSizeTypes[number];
  weight?: typeof TextWeightTypes[number];
  textClassName?: string;
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
  "bold",
] as const;
