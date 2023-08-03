import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Button, Dimensions, View } from "react-native";
import { JobOffer } from "../../components/JobOffer/JobOffer.hooks";
import { FC, useMemo, useState } from "react";
import { HomeScreenProps } from "./Home.interface";
import Carousel from "react-native-reanimated-carousel";
import { LoadingIndicator } from "../../components/shared/LoadingIndicator/LoadingIndicator";
import { JobPositionDetails } from "../../types/positions.types";
import CustomText from "../../components/shared/CustomText/CustomText";
import { BottomActionBar } from "./components/BottomActionBar/BottomActionBar.hooks";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const HomeScreen: FC<HomeScreenProps> = ({
  arrayOfOffersForCarousel,
  carouselRef,
  rejectOffer,
  acceptOffer,
  saveOffer,
}) => {
  const renderItem = ({ item }: { item: JobPositionDetails | null }) => {
    if (item) return <JobOffer offer={item} />;
    else
      return (
        <View className="flex-1 justify-center items-center bg-background">
          <CustomText weight="medium" textClassName="text-center">
            Brak ofert do wyświetlenia
          </CustomText>
        </View>
      );
  };

  return (
    <ContentContainer
      withBackButton={false}
      classname="px-0 bg-primary"
      safeAreaEdges={["left", "right", "bottom"]}
    >
      {arrayOfOffersForCarousel.length ? (
        <Carousel
          loop={false}
          ref={carouselRef}
          height={height * 0.78}
          width={width}
          data={arrayOfOffersForCarousel}
          enabled={false}
          scrollAnimationDuration={800}
          renderItem={renderItem}
        />
      ) : (
        <View className="bg-background flex-1">
          <LoadingIndicator fillContainer />
        </View>
      )}
      <BottomActionBar {...{ acceptOffer, saveOffer, rejectOffer }} />
    </ContentContainer>
  );
};
