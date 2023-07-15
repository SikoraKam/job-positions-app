import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Button } from "react-native-paper";
import { logout } from "../../services/api/auth.service";
import { View } from "react-native";
import { JobOffer } from "../../components/JobOffer/JobOffer.hooks";
import { BottomActionBar } from "../../components/home/BottomActionBar/BottomActionBar.hooks";
import { JobPositionsMock } from "../../mocks/JobPositionMock";
import { useBoundStore } from "../../store/useBoundStore";
import { FC } from "react";
import { HomeScreenProps } from "./Home.interface";

export const HomeScreen: FC<HomeScreenProps> = ({ recommendedOffers }) => {
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
