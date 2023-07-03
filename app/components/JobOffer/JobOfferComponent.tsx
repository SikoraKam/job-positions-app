import { FC } from "react";
import { JobOfferScreenProps } from "./JobOffer.interface";
import { View, Image } from "react-native";
import { Avatar } from "react-native-paper";
import AvatarText from "react-native-paper/lib/typescript/src/components/Avatar/AvatarText";
import CustomText from "../shared/CustomText/CustomText";

export const JobOfferComponent: FC<JobOfferScreenProps> = ({
  positionDetails,
}) => {
  return (
    <View className="border">
      <View className="items-center">
        <Image
          className="h-24 w-full"
          source={{ uri: positionDetails.imageSource }}
        />

        <View>
          {positionDetails.companyLogoImageSource ? (
            <Avatar.Image
              source={{ uri: positionDetails.companyLogoImageSource }}
            />
          ) : (
            <Avatar.Icon icon="offer" />
          )}
        </View>

        <View>
          <CustomText>{positionDetails.positionName}</CustomText>
          <CustomText>{positionDetails.location}</CustomText>
        </View>
      </View>
    </View>
  );
};
