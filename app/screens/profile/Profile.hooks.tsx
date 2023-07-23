import { FC, useEffect, useState } from "react";
import { ProfileScreen } from "./Profile.screen";
import * as DocumentPicker from "expo-document-picker";
import { showToastError } from "../../utils/toast";
import storage from "@react-native-firebase/storage";
import { useBoundStore } from "../../store/useBoundStore";
import { logout } from "../../services/api/auth.service";
import { addResumeFieldsToUser } from "../../services/api/users.service";

export const Profile: FC = () => {
  const [resumePDFUri, setResumePDFUri] = useState<string>();
  const resetAppStateStore = useBoundStore((state) => state.resetAppStateSlice);
  const resetUserStore = useBoundStore((state) => state.resetUserSlice);
  const userUid = useBoundStore((state) => state.currentUserUid);
  const savedResumeUri = useBoundStore((state) => state.savedResumeUri);

  useEffect(() => {
    if (savedResumeUri) setResumePDFUri(savedResumeUri);
  }, [savedResumeUri]);

  const onLogout = async () => {
    resetAppStateStore();
    resetUserStore();
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
          await addResumeFieldsToUser(userUid, url, resumeFileName);
        });
      });
    } else showToastError("Nie udało się wczytać dokumentu");
  };

  return (
    <ProfileScreen
      onLogout={onLogout}
      onUpload={onUploadCV}
      resumeUri={resumePDFUri}
    />
  );
};
