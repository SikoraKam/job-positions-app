import { FC } from "react";
import { HomeScreen } from "./Home.screen";
import { useBoundStore } from "../../store/useBoundStore";

export const Home: FC = () => {
  const recommendedOffers = useBoundStore((state) => state.recommendedOffers);
  // const saveOffer = useBoundStore((state) => state.addToSavedForFuture);
  // const acceptOffer = useBoundStore((state) => state.addToAccepted);
  // const rejectOffer = useBoundStore((state) => state.addToRejected);

  return <HomeScreen recommendedOffers={recommendedOffers} />;
};
