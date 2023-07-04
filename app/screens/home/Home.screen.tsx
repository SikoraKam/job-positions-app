import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Button } from "react-native-paper";
import { logout } from "../../services/api/auth.service";
import { View } from "react-native";
import { JobOffer } from "../../components/JobOffer/JobOffer.hooks";
import { BottomActionBar } from "../../components/home/BottomActionBar/BottomActionBar.hooks";

export const HomeScreen = () => {
  return (
    <ContentContainer
      withBackButton={false}
      classname=" px-0 bg-primary"
      safeAreaEdges={["left", "right", "bottom"]}
    >
      <JobOffer />

      <BottomActionBar />
    </ContentContainer>
  );
};
