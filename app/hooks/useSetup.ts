import { useEffect, useState } from "react";
import { useBoundStore } from "../store/useBoundStore";
import { JobPositionsMock } from "../mocks/JobPositionMock";

export const useSetup = () => {
  const reinitializeRecommendedOffers = useBoundStore(
    (state) => state.reinitializeRecommendedOffers
  );

  const setAppInitialized = useBoundStore((state) => state.setAppInitialized);

  useEffect(() => {
    // get from api

    (async () => {
      const recommendedOffers = JobPositionsMock;

      reinitializeRecommendedOffers(recommendedOffers);
      setAppInitialized(true);
    })();
  }, [reinitializeRecommendedOffers]);
};
