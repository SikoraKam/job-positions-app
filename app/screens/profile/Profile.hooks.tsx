import { FC, useEffect, useState } from "react";
import { ProfileScreen } from "./Profile.screen";
import * as DocumentPicker from "expo-document-picker";
import { showToastError } from "../../utils/toast";
import storage from "@react-native-firebase/storage";
import { logout } from "../../services/api/auth.service";
import {
  addResumeFieldsToUser,
  deleteResumeFieldsFromUser,
} from "../../services/api/users.service";
import { useAppStateStore } from "../../store/appStateStore";
import { useUserStore } from "../../store/userStore";
import { useOffersStore } from "../../store/offersStore";

export const Profile: FC = () => {
  const [resumePDFUri, setResumePDFUri] = useState<string>();
  const resetAppStateStore = useAppStateStore(
    (state) => state.resetAppStateSlice
  );
  const resetUserStore = useUserStore((state) => state.resetUserSlice);
  const resetOfferStore = useOffersStore((state) => state.resetOffersSlice);
  const userUid = useUserStore((state) => state.currentUserUid);
  const savedResumeUri = useUserStore((state) => state.savedResumeUri);
  const setSavedResumeUri = useUserStore((state) => state.setSavedResumeUri);

  useEffect(() => {
    if (savedResumeUri) setResumePDFUri(savedResumeUri);
  }, [savedResumeUri]);

  const onLogout = async () => {
    resetAppStateStore();
    resetUserStore();
    resetOfferStore();
    await logout();
  };

  const onUploadCV = async () => {
    if (!userUid) {
      console.error("Brak uid");
      return;
    }
    const document = await DocumentPicker.getDocumentAsync();
    if (document.type === "success") {
      setResumePDFUri(document.uri);
      const resumeFileName = `${document.name}_${new Date().getTime() / 1000}`;
      const reference = storage().ref(resumeFileName);

      const task = reference.putFile(document.uri);

      task.on("state_changed", (taskSnapshot) => {
        taskSnapshot.ref.getDownloadURL().then(async (url) => {
          setSavedResumeUri(url);
          await addResumeFieldsToUser(userUid, url, resumeFileName);
        });
      });
    } else showToastError("Nie udało się wczytać dokumentu");
  };

  const onDeleteResume = async () => {
    if (!userUid) {
      console.error("Brak uid");
      return;
    }
    await deleteResumeFieldsFromUser(userUid);
    setResumePDFUri("");
  };

  return (
    <ProfileScreen
      onDeleteResume={onDeleteResume}
      onLogout={onLogout}
      onUpload={onUploadCV}
      resumeUri={resumePDFUri}
    />
  );
};
