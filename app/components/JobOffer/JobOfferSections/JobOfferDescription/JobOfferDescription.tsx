import { FC } from "react";
import { JobOfferDescriptionProps } from "./JobOfferDescription.interface";
import { ScrollView, View } from "react-native";
import CustomText from "../../../shared/CustomText/CustomText";
import { styled } from "nativewind";

const StyledScrollView = styled(ScrollView, {
  props: {
    contentContainerStyle: true,
  },
});

export const JobOfferDescription: FC<JobOfferDescriptionProps> = ({
  description,
  remote,
  skills,
  responsibilities,
  partTime,
  requirements,
}) => {
  return (
    <StyledScrollView contentContainerStyle="px-4">
      <View className="mt-8" />
      {description && (
        <>
          <CustomText size="xl" weight="semibold">
            Opis oferty
          </CustomText>
          <CustomText textClassName="mt-2 text-copy-gray">
            {description}
          </CustomText>
        </>
      )}

      {requirements && (
        <>
          <CustomText size="xl" textClassName="mt-4" weight="semibold">
            Wymagania
          </CustomText>
          <View className="mt-2">
            {requirements.map((el, index) => (
              <CustomText
                key={index}
                textClassName="text-copy-gray"
              >{`\u2022 ${el}`}</CustomText>
            ))}
          </View>
        </>
      )}

      <CustomText size="xl" textClassName="mt-4 mb-2" weight="semibold">
        Potrzebne umiejętności
      </CustomText>
      <View className="wrap flex-row gap-4">
        {skills.map((skill, index) => (
          <CustomText textClassName="text-copy-gray" key={index}>
            {"\u2022"} {skill}
          </CustomText>
        ))}
      </View>

      {responsibilities && (
        <>
          <CustomText size="xl" textClassName="mt-4" weight="semibold">
            Obowiązki
          </CustomText>
          <View className="mt-2">
            {responsibilities.map((el, index) => (
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
