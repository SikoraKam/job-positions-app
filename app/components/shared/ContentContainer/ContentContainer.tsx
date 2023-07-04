import Constants from "expo-constants";
import React, { FC, useCallback, useState } from "react";
import { Platform, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContentContainerInterface } from "./ContentContainer.interface";
import { ContentInsideContainer } from "./ContentInsideContainer";
import { ErrorView } from "../ErrorView/ErrorView";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { Header } from "../Header/Header";

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const ANDROID_HEADER_PADDING_TOP = STATUS_BAR_HEIGHT;
const IOS_HEADER_PADDING_TOP = 16;
const HAS_NOTCH = DeviceInfo.hasNotch();

export const ContentContainer: FC<ContentContainerInterface> = ({
  classname,
  title,
  withHeader = true,
  children,
  withBackButton = true,
  backButtonBehaviour,
  isLoading,
  noPadding = false,
  withScroll,
  contentContainerClassname,
  error = undefined,
  safeAreaEdges,
}) => {
  const getChildrenComponent = () => {
    if (error) return <ErrorView />;

    if (isLoading) return <LoadingIndicator fillContainer />;

    return children;
  };

  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === "android"
            ? ANDROID_HEADER_PADDING_TOP
            : HAS_NOTCH
            ? 0
            : IOS_HEADER_PADDING_TOP,
      }}
      className={`flex-1 bg-background px-4 ${classname}`}
      edges={safeAreaEdges}
    >
      {withHeader && (
        <Header
          backNavigationFunction={backButtonBehaviour}
          withBackButton={withBackButton}
          title={title}
          textClassName="px-4 sm:px-6"
        />
      )}
      <ContentInsideContainer
        {...{
          contentContainerClassname,
          isLoading,
          noPadding,
          withScroll,
        }}
      >
        {getChildrenComponent()}
      </ContentInsideContainer>

      {!withScroll && <View className="pb-3" />}
    </SafeAreaView>
  );
};
