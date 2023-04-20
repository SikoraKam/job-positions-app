import { View } from "react-native";
import { FC } from "react";
import CustomText from "../CustomText/CustomText";

export const ErrorView: FC = () => (
  <View className="flex-1 justify-center items-center bg-background">
    <CustomText weight="medium" textClassName="text-error">
      Error
    </CustomText>
  </View>
);
