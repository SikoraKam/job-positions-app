import { useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { getUserDoc } from "../services/api/users.service";
import { useAppStateStore } from "../store/appStateStore";
import { useUserStore } from "../store/userStore";
import { AsyncStorageKeys, getDataFromAsyncStorage } from "../utils/storage";
import { UserData } from "../types/user.types";
import { getOffersByIds } from "../services/api/offers.service";
import { useOffersStore } from "../store/offersStore";
import { JobPositionDetails } from "../types/positions.types";

export const useSetup = () => {
  const setAppInitialized = useAppStateStore(
    (state) => state.setAppInitialized
  );
  const setCurrentUserUid = useUserStore((state) => state.setCurrentUserUid);
  const setSavedResumeUri = useUserStore((state) => state.setSavedResumeUri);
  const setUserData = useUserStore((state) => state.setUserData);
  const loadProcessedOffers = useOffersStore(
    (state) => state.loadProcessedOffers
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const loadProcessedOffersToStore = async (userData: UserData) => {
    let accepted: JobPositionDetails[] = [];
    let rejected: JobPositionDetails[] = [];
    let saved: JobPositionDetails[] = [];
    if (userData.acceptedOffersIds?.length) {
      accepted = [...(await getOffersByIds(userData.acceptedOffersIds))];
    }
    if (userData.rejectedOffersIds?.length) {
      rejected = [...(await getOffersByIds(userData.rejectedOffersIds))];
    }
    if (userData.savedOffersIds?.length) {
      saved = [...(await getOffersByIds(userData.savedOffersIds))];
    }
    loadProcessedOffers({ accepted, saved, rejected });
  };

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (!user) return;

    const uid = auth().currentUser?.uid;

    if (uid) setCurrentUserUid(uid);
    const userData = await getUserDoc();
    if (userData) {
      setUserData(userData);
      await loadProcessedOffersToStore(userData);
    }

    if (userData.resumeUrl) setSavedResumeUri(userData.resumeUrl);
    else setSavedResumeUri("");
  };

  useEffect(() => {
    (async () => {
      setAppInitialized(true);
    })();
  }, [setAppInitialized]);
};
