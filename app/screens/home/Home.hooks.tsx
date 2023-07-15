import { FC, Ref } from "react";
import { HomeScreen } from "./Home.screen";
import { useBoundStore } from "../../store/useBoundStore";
import { useRef } from "react/index";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { JobPositionDetails } from "../../types/positions.types";

export const Home: FC = () => {
  const recommendedOffers = useBoundStore((state) => state.recommendedOffers);
  const addToSavedForFuture = useBoundStore(
    (state) => state.addToSavedForFuture
  );
  const addToAccepted = useBoundStore((state) => state.addToAccepted);
  const addToRejected = useBoundStore((state) => state.addToRejected);

  const carouselRef: Ref<ICarouselInstance> = useRef(null);

  const acceptOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: () => addToAccepted(recommendedOffers[0]),
    });
  };

  const rejectOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: () => addToRejected(recommendedOffers[0]),
    });
  };

  const saveOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: () => addToSavedForFuture(recommendedOffers[0]),
    });
  };

  return (
    <HomeScreen
      {...{
        acceptOffer,
        rejectOffer,
        saveOffer,
        recommendedOffers,
        carouselRef,
      }}
    />
  );
};
