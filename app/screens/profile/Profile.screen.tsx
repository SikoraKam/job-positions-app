import { FC } from "react";
import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Dimensions, Pressable, View } from "react-native";
import CustomText from "../../components/shared/CustomText/CustomText";
import { Button, IconButton } from "react-native-paper";
import { logout } from "../../services/api/auth.service";
import { ProfileScreenProps } from "./Profile.interface";
import Pdf from "react-native-pdf";

export const ProfileScreen: FC<ProfileScreenProps> = ({
  onUpload,
  resumeUri,
}) => {
  const renderPdfPreview = () => (
    <View className={"flex-1 items-center"}>
      <Pdf
        source={{ uri: resumeUri }}
        style={{
          flex: 1,
          width: Dimensions.get("screen").width,
          height: "70%",
        }}
      />
    </View>
  );

  return (
    <ContentContainer withBackButton={false} safeAreaEdges={["bottom"]}>
      {resumeUri ? (
        renderPdfPreview()
      ) : (
        <Pressable
          className="border items-center justify-center divide-dashed h-48 mt-4"
          style={{ borderStyle: "dotted" }}
          onPress={onUpload}
        >
          <CustomText>Wgraj CV w formacie pdf</CustomText>
          <IconButton icon="file-upload-outline" size={48} onPress={onUpload} />
        </Pressable>
      )}

      <View className="flex-1 justify-end">
        <Button
          onPress={logout}
          className="py-1"
          mode="contained"
          icon="logout"
        >
          Wyloguj się
        </Button>
      </View>
    </ContentContainer>
  );
};
