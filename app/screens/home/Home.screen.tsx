import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Button } from "react-native-paper";
import { logout } from "../../services/api/auth.service";
import { View } from "react-native";
import { JobOffer } from "../../components/JobOffer/JobOffer.hooks";

export const HomeScreen = () => {
  return (
    <ContentContainer
      withBackButton={false}
      classname="border px-0"
      safeAreaEdges={["bottom", "left", "right"]}
    >
      <JobOffer />
    </ContentContainer>
  );
};
