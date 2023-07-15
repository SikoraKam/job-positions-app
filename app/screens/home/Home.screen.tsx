import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Button } from "react-native-paper";
import { logout } from "../../services/api/auth.service";
import { Dimensions, View } from "react-native";
import { JobOffer } from "../../components/JobOffer/JobOffer.hooks";
import { BottomActionBar } from "../../components/home/BottomActionBar/BottomActionBar.hooks";
import { JobPositionsMock } from "../../mocks/JobPositionMock";
import { useBoundStore } from "../../store/useBoundStore";
import { FC, useState } from "react";
import { HomeScreenProps } from "./Home.interface";
import CustomText from "../../components/shared/CustomText/CustomText";
import Carousel from "react-native-reanimated-carousel";
import { LoadingIndicator } from "../../components/shared/LoadingIndicator/LoadingIndicator";
import { useSetup } from "../../hooks/useSetup";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const HomeScreen: FC<HomeScreenProps> = ({
  recommendedOffers,
  carouselRef,
  rejectOffer,
  acceptOffer,
  saveOffer,
}) => {
  return (
    <ContentContainer
      withBackButton={false}
      classname="px-0 bg-primary"
      safeAreaEdges={["left", "right", "bottom"]}
    >
      {recommendedOffers.length ? (
        <Carousel
          ref={carouselRef}
          loop
          height={height * 0.78}
          width={width}
          data={recommendedOffers}
          // snapEnabled={false}
          enabled={false}
          scrollAnimationDuration={1000}
          renderItem={({ index, item }: { index: number; item: any }) => (
            <JobOffer offer={item} />
          )}
        />
      ) : (
        <LoadingIndicator fillContainer />
      )}
      <BottomActionBar {...{ acceptOffer, saveOffer, rejectOffer }} />
    </ContentContainer>
  );
};
