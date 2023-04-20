import { FC } from "react";
import { CustomTextProps } from "./CustomText.interface";
import { classNames } from "../../../utils/helpers";
import { Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { DEFAULT_SCREEN_HEIGHT } from "../../../const/layout";
import { styled } from "nativewind";

const CustomText: FC<CustomTextProps> = ({
  size,
  numberOfLines,
  textClassName,
  weight,
  onPress,
  children,
  ...otherProps
}) => {
  let textSize;
  let lineHeight;

  switch (size) {
    case "xs":
      textSize = 12;
      lineHeight = 16;
      break;

    case "sm":
      textSize = 14;
      lineHeight = 20;
      break;

    default:

    case "base":
      textSize = 16;
      lineHeight = 24;
      break;

    case "lg":
      textSize = 18;
      lineHeight = 28;
      break;

    case "xl":
      textSize = 20;
      lineHeight = 28;
      break;

    case "2xl":
      textSize = 24;
      lineHeight = 32;
      break;

    case "3xl":
      textSize = 30;
      lineHeight = 36;
      break;

    case "4xl":
      textSize = 36;
      lineHeight = 40;
      break;
  }

  const combinedClassName = classNames(
    `font-${weight}`,
    textClassName as string
  );

  return (
    <Text
      onPress={onPress}
      className={combinedClassName}
      style={{
        fontSize: RFValue(textSize, DEFAULT_SCREEN_HEIGHT),
        lineHeight: RFValue(lineHeight, DEFAULT_SCREEN_HEIGHT),
      }}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default styled(CustomText, { props: { textClassName: true } });
