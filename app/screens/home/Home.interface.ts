import { JobPositionDetails } from "../../types/positions.types";
import { Ref } from "react";
import { ICarouselInstance } from "react-native-reanimated-carousel";

export interface HomeScreenProps {
  arrayOfOffersForCarousel: (JobPositionDetails | null)[];
  acceptOffer: () => void;
  rejectOffer: () => void;
  saveOffer: () => void;
  carouselRef: Ref<ICarouselInstance>;
}
