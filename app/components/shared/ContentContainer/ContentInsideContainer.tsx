import React, { FC } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import { ContentInsideContainerProps } from "./ContentInsideContainer.interface";
import { KeyboardAvoidingScrollView } from "../KeyboardAvoidingScrollView";

export const ContentInsideContainer: FC<ContentInsideContainerProps> = ({
  children,
  contentContainerClassname,
  withScroll,
  isLoading,
}) => {
  const contentContainerStyle = `
    flex-1 px-4,
    ${contentContainerClassname},
  `;

  if (withScroll && !isLoading) {
    return (
      <KeyboardAvoidingScrollView
        keyboardAvoidingViewClassname={contentContainerStyle}
      >
        {children}
      </KeyboardAvoidingScrollView>
    );
  }
  return <View className={contentContainerStyle}>{children}</View>;
};
