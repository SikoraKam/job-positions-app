import { FC, useState } from "react";
import { JobOfferScreenProps } from "./JobOffer.interface";
import { Image, useWindowDimensions, View } from "react-native";
import { Avatar } from "react-native-paper";
import CustomText from "../shared/CustomText/CustomText";
import { TabView } from "react-native-tab-view";
import { useAppTheme } from "../../theme/theme";
import { JobOfferDescription } from "./JobOfferSections/JobOfferDescription/JobOfferDescription";
import { JobOfferCompanySection } from "./JobOfferSections/JobOfferCompanySection/JobOfferCompanySection";
import { JobOfferSalarySection } from "./JobOfferSections/JobOfferSalarySection/JobOfferSalarySection";
import { StyledTabBar } from "../../uiStyledComponents/StyledTabBar";

export const JobOfferComponent: FC<JobOfferScreenProps> = ({
  positionDetails,
}) => {
  const theme = useAppTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "description", title: "Opis" },
    { key: "company", title: "Firma" },
    { key: "salary", title: "Zarobki" },
  ]);

  const renderScene = ({
    route,
  }: {
    route: { index: number; key: string };
  }) => {
    switch (route.key) {
      case "description":
        return <JobOfferDescription {...positionDetails} />;
      case "company":
        return <JobOfferCompanySection {...positionDetails} />;
      case "salary":
        return <JobOfferSalarySection {...positionDetails} />;
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
      labelStyle="font-semibold"
      indicatorStyle="bg-secondary"
    />
  );

  return (
    <View className="flex-1 bg-background">
      <View className="items-center">
        <Image
          className="h-24 w-full"
          source={{ uri: positionDetails.imageSource }}
        />

        <View className="-mt-8">
          {positionDetails.companyLogoImageSource ? (
            <Avatar.Image
              source={{ uri: positionDetails.companyLogoImageSource }}
            />
          ) : (
            <Avatar.Icon icon="offer" />
          )}
        </View>

        <View className="mt-4">
          <CustomText weight="bold" size="xl" textClassName="text-center">
            {positionDetails.positionName}
          </CustomText>
          <CustomText size="base" textClassName="text-center">
            {positionDetails.location}
          </CustomText>
        </View>
      </View>

      <TabView
        renderTabBar={renderTabBar}
        // @ts-ignore
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};
