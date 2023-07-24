import firestore from "@react-native-firebase/firestore";
import { FIRESTORE_COLLECTIONS } from "../../const/firestore";
import { showToastError } from "../../utils/toast";
import { getLoggedUserUid } from "./auth.service";

export const getUserRefByUID = async (uid: string | undefined) => {
  if (!uid) {
    showToastError("brak uid");
    console.error("Brak uid");
    return;
  }
  return firestore().collection(FIRESTORE_COLLECTIONS.USERS).doc(uid);
};

export const addResumeFieldsToUser = async (
  userUid: string,
  resumeUrl: string,
  resumeFileName: string
) => {
  const userRef = await getUserRefByUID(userUid);

  userRef?.update({
    resumeUrl,
    resumeFileName,
  });
};

export const deleteResumeFieldsFromUser = async (userUid: string) => {
  const userRef = await getUserRefByUID(userUid);

  userRef?.update({
    resumeUrl: "",
    resumeFileName: "",
  });
};

export const getSavedResumeUri = async () => {
  const userRef = await getUserRefByUID(getLoggedUserUid());
  const user = await userRef?.get();
  return user?.data()?.resumeUrl;
};
