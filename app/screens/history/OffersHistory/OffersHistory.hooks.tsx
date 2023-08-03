import { FC } from "react";
import { OffersHistoryScreen } from "./OffersHistory.screen";
import { useOffersStore } from "../../../store/offersStore";

export const OffersHistory: FC = () => {
  const acceptedOffers = useOffersStore((state) => state.acceptedOffers);
  const rejectedOffers = useOffersStore((state) => state.rejectedOffers);
  const savedOffers = useOffersStore((state) => state.savedForFutureOffers);

  return (
    <OffersHistoryScreen
      acceptedOffers={acceptedOffers}
      rejectedOffers={rejectedOffers}
      savedOffers={savedOffers}
    />
  );
};
