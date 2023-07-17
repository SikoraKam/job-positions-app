import { FC, useState } from "react";
import { OffersHistoryScreenProps } from "./OffersHistory.interface";
import { ContentContainer } from "../../../components/shared/ContentContainer/ContentContainer";
import { useWindowDimensions } from "react-native";
import { styled } from "nativewind";
import { TabBar, TabView } from "react-native-tab-view";
import { useAppTheme } from "../../../theme/theme";
import { HistoryList } from "../components/HistoryList/HistoryList";

const StyledTabBar = styled(TabBar, {
  props: {
    labelStyle: true,
    indicatorStyle: true,
  },
});

export const OffersHistoryScreen: FC<OffersHistoryScreenProps> = ({
  acceptedOffers,
  savedOffers,
  rejectedOffers,
}) => {
  const theme = useAppTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "saved", title: "Zapisane" },
    { key: "rejected", title: "Odrzucone" },
    { key: "accepted", title: "Przyjęte" },
  ]);

  const renderScene = ({
    route,
  }: {
    route: { index: number; key: string };
  }) => {
    switch (route.key) {
      case "saved":
        return <HistoryList offers={savedOffers} />;
      case "rejected":
        return <HistoryList offers={rejectedOffers} />;
      case "accepted":
        return <HistoryList offers={acceptedOffers} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <StyledTabBar
      {...props}
      className="bg-background mt-4"
      activeColor={theme.colors.copy.black}
      inactiveColor={theme.colors.copy.gray}
      labelStyle="font-semibold text-sm"
      indicatorStyle="bg-secondary"
    />
  );

  return (
    <ContentContainer
      withBackButton={false}
      safeAreaEdges={["left", "right", "bottom"]}
    >
      <TabView
        renderTabBar={renderTabBar}
        // @ts-ignore
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </ContentContainer>
  );
};
