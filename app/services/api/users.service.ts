import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { FIRESTORE_COLLECTIONS } from "../../const/firestore";
import { showToastError } from "../../utils/toast";
import { getLoggedUserUid } from "./auth.service";
import { UserContactDetails, UserData } from "../../types/user.types";

export const getUserRefByUID = async (uid: string | undefined) => {
  if (!uid) {
    showToastError("brak uid");
    console.error("Brak uid");
    return;
  }
  return firestore().collection(FIRESTORE_COLLECTIONS.USERS).doc(uid);
};

export const getUserDoc = async (): Promise<UserData> => {
  const userRef = await getUserRefByUID(getLoggedUserUid());
  const user = await userRef?.get();
  return {
    id: user?.data()?.id,
    email: user?.data()?.email,
    name: user?.data()?.fullName,
    resumeUrl: user?.data()?.resumeUrl,
    resumeFileName: user?.data()?.resumeFileName,
    savedOffersIds: user?.data()?.savedOffers,
    rejectedOffersIds: user?.data()?.rejectedOffers,
    acceptedOffersIds: user?.data()?.acceptedOffers,
  };
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

export const getUserContactDetails = async (): Promise<UserContactDetails> => {
  const userRef = await getUserRefByUID(getLoggedUserUid());
  const user = await userRef?.get();
  return {
    name: user?.data()?.fullName,
    email: user?.data()?.email,
  };
};

export const postAcceptedOfferId = async (offerId: string) => {
  const userRef = await getUserRefByUID(getLoggedUserUid());
  userRef?.update({
    acceptedOffers: firestore.FieldValue.arrayUnion(offerId),
  });
};

export const postSavedOfferId = async (offerId: string) => {
  const userRef = await getUserRefByUID(getLoggedUserUid());
  userRef?.update({
    savedOffers: firestore.FieldValue.arrayUnion(offerId),
  });
};

export const postRejectedOfferId = async (offerId: string) => {
  const userRef = await getUserRefByUID(getLoggedUserUid());
  userRef?.update({
    rejectedOffers: firestore.FieldValue.arrayUnion(offerId),
  });
};

export const getProcessedOffers = async () => {
  const userRef = await getUserRefByUID(getLoggedUserUid());
  const user = await userRef?.get();
  return {
    acceptedOffers: user?.data()?.acceptedOffers,
    rejectedOffers: user?.data()?.rejectedOffers,
    savedOffers: user?.data()?.savedOffers,
  };
};
