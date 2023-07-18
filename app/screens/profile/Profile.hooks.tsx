import { FC, useState } from "react";
import { ProfileScreen } from "./Profile.screen";
import * as DocumentPicker from "expo-document-picker";
import { showToastError } from "../../utils/toast";

export const Profile: FC = () => {
  const [resumePDFUri, setResumePDFUri] = useState<string>();

  const onUploadCV = async () => {
    const document = await DocumentPicker.getDocumentAsync();
    if (document.type === "success") setResumePDFUri(document.uri);
    else showToastError("Nie udało się wczytać dokumentu");
  };

  return <ProfileScreen onUpload={onUploadCV} resumeUri={resumePDFUri} />;
};
