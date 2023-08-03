import { useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  getSavedResumeUri,
  getUserDetails,
} from "../services/api/users.service";
import { useAppStateStore } from "../store/appStateStore";
import { useUserStore } from "../store/userStore";
import { AsyncStorageKeys, getDataFromAsyncStorage } from "../utils/storage";

export const useSetup = () => {
  const setAppInitialized = useAppStateStore(
    (state) => state.setAppInitialized
  );
  const setCurrentUserUid = useUserStore((state) => state.setCurrentUserUid);
  const setSavedResumeUri = useUserStore((state) => state.setSavedResumeUri);
  const setUserData = useUserStore((state) => state.setUserData);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (!user) return;

    const uid = auth().currentUser?.uid;
    const previousUid = await getDataFromAsyncStorage(
      AsyncStorageKeys.PREVIOUS_USER_UID
    );
    if (uid === previousUid) return;

    if (uid) setCurrentUserUid(uid);
    const userData = await getUserDetails();
    if (userData) setUserData(userData);

    const resumeUri = await getSavedResumeUri();
    if (resumeUri) setSavedResumeUri(resumeUri);
    else setSavedResumeUri("");
  };

  useEffect(() => {
    (async () => {
      setAppInitialized(true);
    })();
  }, [setAppInitialized]);
};
