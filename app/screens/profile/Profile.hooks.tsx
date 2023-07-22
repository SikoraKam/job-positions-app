import { FC, useState } from "react";
import { ProfileScreen } from "./Profile.screen";
import * as DocumentPicker from "expo-document-picker";
import { showToastError, showToastSuccess } from "../../utils/toast";
import storage from "@react-native-firebase/storage";
import { useBoundStore } from "../../store/useBoundStore";
import { logout } from "../../services/api/auth.service";
import { getUserRefByUID } from "../../services/api/users.service";

export const Profile: FC = () => {
  const [resumePDFUri, setResumePDFUri] = useState<string>();
  const resetAppStateStore = useBoundStore((state) => state.resetAppStateSlice);
  const userUid = useBoundStore((state) => state.currentUserUId);

  const onLogout = async () => {
    resetAppStateStore();
    await logout();
  };

  const onUploadCV = async () => {
    const document = await DocumentPicker.getDocumentAsync();
    if (document.type === "success") {
      setResumePDFUri(document.uri);
      const reference = storage().ref(
        `${document.name}_${new Date().getTime() / 1000}`
      );

      const task = reference.putFile(document.uri);

      task.on("state_changed", (taskSnapshot) => {
        taskSnapshot.ref.getDownloadURL().then(async (url) => {
          const userRef = await getUserRefByUID(userUid);
          userRef?.update({
            resumeUrl: url,
          });
        });
      });

      // console.log("URL 999999", downloadUrl);
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
