import firestore from "@react-native-firebase/firestore";
import { FIRESTORE_COLLECTIONS } from "../../const/firestore";
import { showToastError } from "../../utils/toast";

export const getUserRefByUID = async (uid: string | undefined) => {
  if (!uid) {
    showToastError("brak uid");
    console.error("Brak uid");
    return;
  }
  return firestore().collection(FIRESTORE_COLLECTIONS.USERS).doc(uid);
};
