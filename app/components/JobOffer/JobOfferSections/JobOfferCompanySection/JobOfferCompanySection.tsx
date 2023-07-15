import { FC } from "react";
import { JobOfferCompanySectionProps } from "./JobOfferCompanySection.interface";
import { Linking, ScrollView, View } from "react-native";
import CustomText from "../../../shared/CustomText/CustomText";
import { styled } from "nativewind";

const StyledScrollView = styled(ScrollView, {
  props: {
    contentContainerStyle: true,
  },
});

export const JobOfferCompanySection: FC<JobOfferCompanySectionProps> = ({
  companyName,
  website,
  contactEmail,
  companySize,
  companyOfficeLocations,
}) => {
  return (
    <StyledScrollView contentContainerStyle="px-4">
      <View className="mt-8" />

      <View className="flex-row mt-4 items-center">
        <CustomText size="xl" weight="bold">
          {companyName}
        </CustomText>
      </View>

      {website && (
        <CustomText
          onPress={() => Linking.openURL(website)}
          size="lg"
          textClassName="mt-4 underline text-primary700"
        >
          {website}
        </CustomText>
      )}

      <View className="flex-row mt-2 items-center">
        <CustomText weight="semibold" size="lg">
          Kontakt:{" "}
        </CustomText>
        <CustomText size="lg">{contactEmail}</CustomText>
      </View>

      <View className="flex-row mt-2 items-center">
        <CustomText weight="semibold" size="lg">
          Wielkość firmy:{" "}
        </CustomText>
        <CustomText size="lg">{companySize}</CustomText>
      </View>

      {companyOfficeLocations && (
        <>
          <CustomText size="xl" textClassName="mt-4" weight="semibold">
            Lokalizacje biura
          </CustomText>
          <View className="mt-2">
            {companyOfficeLocations.map((el, index) => (
              <CustomText
                textClassName="text-copy-gray"
                key={index}
              >{`\u2022 ${el}`}</CustomText>
            ))}
          </View>
        </>
      )}

      <View className="pb-8" />
    </StyledScrollView>
  );
};
