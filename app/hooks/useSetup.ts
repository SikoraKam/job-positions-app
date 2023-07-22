import { useEffect, useState } from "react";
import { useBoundStore } from "../store/useBoundStore";
import { JobPositionsMock } from "../mocks/JobPositionMock";
import auth from "@react-native-firebase/auth";

export const useSetup = () => {
  const reinitializeRecommendedOffers = useBoundStore(
    (state) => state.reinitializeRecommendedOffers
  );

  const setAppInitialized = useBoundStore((state) => state.setAppInitialized);
  const setCurrentUserUid = useBoundStore((state) => state.setCurrentUserUid);

  useEffect(() => {
    // get from api

    (async () => {
      const recommendedOffers = JobPositionsMock;

      reinitializeRecommendedOffers(recommendedOffers);
      const uid = auth().currentUser?.uid;
      if (uid) setCurrentUserUid(uid);
      setAppInitialized(true);
    })();
  }, [reinitializeRecommendedOffers]);
};
