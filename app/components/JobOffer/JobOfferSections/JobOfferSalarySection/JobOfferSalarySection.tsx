import { FC } from "react";
import { JobOfferSalarySectionInterface } from "./JobOfferSalarySection.interface";
import { Linking, ScrollView, View } from "react-native";
import CustomText from "../../../shared/CustomText/CustomText";
import { styled } from "nativewind";

const StyledScrollView = styled(ScrollView, {
  props: {
    contentContainerStyle: true,
  },
});

export const JobOfferSalarySection: FC<JobOfferSalarySectionInterface> = ({
  salary,
  benefits,
}) => {
  return (
    <StyledScrollView contentContainerStyle="px-4">
      <View className="mt-8" />

      <View className="flex-row mt-2 items-center">
        <CustomText weight="semibold" size="xl">
          Widełki płacowe:{" "}
        </CustomText>
        <CustomText size="xl">{salary}</CustomText>
      </View>

      {benefits && (
        <>
          <CustomText size="xl" textClassName="mt-4" weight="semibold">
            Benefity
          </CustomText>
          <View className="mt-2">
            {benefits.map((el, index) => (
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
