import auth from "@react-native-firebase/auth";
import {
  showToastError,
  showToastInfo,
  showToastSuccess,
} from "../../utils/toast";
import firestore from "@react-native-firebase/firestore";
import { FIRESTORE_COLLECTIONS } from "../../const/firestore";

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
): Promise<boolean> => {
  try {
    const createUserResponse = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = createUserResponse.user.uid;
    const data = {
      id: uid,
      email,
      fullName,
    };
    await saveUserInFirestore(data);
    showToastSuccess("Rejestracja przebiegła pomyślnie");
    return true;
  } catch (error: any) {
    showToastError(error.message);
    console.log(error.message);
    return false;
  }
};

const saveUserInFirestore = async (data: {
  id: string;
  email: string;
  fullName: string;
}) => {
  const usersRef = firestore().collection(FIRESTORE_COLLECTIONS.USERS);
  try {
    await usersRef.doc(data.id).set(data);
  } catch (e: any) {
    showToastError(e.message);
    console.log(e.message);
    throw Error();
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    // const uid = response.user.uid
    return true;
  } catch (e: any) {
    showToastError(e.message);
    console.log(e.message);
    return false;
  }
};

export const logout = async () => {
  await auth().signOut();
};
