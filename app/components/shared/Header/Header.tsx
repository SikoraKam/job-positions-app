import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderProps } from "./Header.interface";
import CustomText from "../CustomText/CustomText";

export const Header: FC<HeaderProps> = ({
  title,
  backNavigationFunction,
  withBackButton = true,
  textClassName,
}) => {
  const navigation = useNavigation();

  const onPressBackArrow = () => {
    return backNavigationFunction
      ? backNavigationFunction()
      : navigation.goBack();
  };

  return (
    <View
      accessibilityRole="header"
      className={`
        flex-row items-center pb-2,
        ${textClassName},
        ${withBackButton ? "justify-between" : "justify-center"}
      `}
    >
      {withBackButton && (
        <TouchableOpacity
          accessibilityLabel="Tap to go back"
          accessibilityHint="Button for going back"
          className="px-2 py-1"
          onPress={onPressBackArrow}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
      )}
      {title && (
        <CustomText weight="medium" size="xl">
          {title}
        </CustomText>
      )}
      {withBackButton && <View className="px-2 py-1" />}
    </View>
  );
};
