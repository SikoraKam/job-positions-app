import { useEffect, useState } from "react";
import { useBoundStore } from "../store/useBoundStore";
import { JobPositionsMock } from "../mocks/JobPositionMock";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { getSavedResumeUri } from "../services/api/users.service";

export const useSetup = () => {
  const reinitializeRecommendedOffers = useBoundStore(
    (state) => state.reinitializeRecommendedOffers
  );

  const setAppInitialized = useBoundStore((state) => state.setAppInitialized);
  const setCurrentUserUid = useBoundStore((state) => state.setCurrentUserUid);
  const setSavedResumeUri = useBoundStore((state) => state.setSavedResumeUri);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (!user) return;

    const recommendedOffers = JobPositionsMock;
    reinitializeRecommendedOffers(recommendedOffers);

    const uid = auth().currentUser?.uid;
    if (uid) setCurrentUserUid(uid);

    const resumeUri = await getSavedResumeUri();
    if (resumeUri) setSavedResumeUri(resumeUri);
  };

  useEffect(() => {
    (async () => {
      setAppInitialized(true);
    })();
  }, [setAppInitialized]);
};
