import React, { FC } from "react";
import { ActivityIndicator, Platform, SafeAreaView, View } from "react-native";

import { LoadingIndicatorProps } from "./LoadingIndicator.interface";

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  fullscreen,
  fillContainer,
  sizeIOS = "large",
  sizeAndroid = 40,
  color = "#2A71D4",
}) => {
  const renderSpinner = () => (
    <ActivityIndicator
      size={Platform.OS === "android" ? sizeAndroid : sizeIOS}
      color={color}
    />
  );

  if (fillContainer) {
    return (
      <View className="items-center justify-center flex-1">
        {renderSpinner()}
      </View>
    );
  }

  if (fullscreen) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center w-screen h-screen">
        {renderSpinner()}
      </SafeAreaView>
    );
  }

  return renderSpinner();
};
