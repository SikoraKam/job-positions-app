import { useEffect } from "react";
import { useBoundStore } from "../store/useBoundStore";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  getSavedResumeUri,
  getUserDetails,
} from "../services/api/users.service";

export const useSetup = () => {
  const setAppInitialized = useBoundStore((state) => state.setAppInitialized);
  const setCurrentUserUid = useBoundStore((state) => state.setCurrentUserUid);
  const setSavedResumeUri = useBoundStore((state) => state.setSavedResumeUri);
  const setUserData = useBoundStore((state) => state.setUserData);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (!user) return;

    const uid = auth().currentUser?.uid;
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
