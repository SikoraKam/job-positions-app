import { FC, useState } from "react";
import { OffersHistoryScreen } from "./OffersHistory.screen";
import { useBoundStore } from "../../store/useBoundStore";

export const OffersHistory: FC = () => {
  const acceptedOffers = useBoundStore((state) => state.acceptedOffers);
  const rejectedOffers = useBoundStore((state) => state.rejectedOffers);
  const savedOffers = useBoundStore((state) => state.savedForFutureOffers);

  return (
    <OffersHistoryScreen
      acceptedOffers={acceptedOffers}
      rejectedOffers={rejectedOffers}
      savedOffers={savedOffers}
    />
  );
};
