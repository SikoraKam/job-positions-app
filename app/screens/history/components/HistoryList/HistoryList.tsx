import { FC } from "react";
import { HistoryListProps } from "./HistoryList.interface";
import { FlatList, Pressable, View } from "react-native";
import { JobPositionDetails } from "../../../../types/positions.types";
import CustomText from "../../../../components/shared/CustomText/CustomText";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { HistoryStackNavigatorType } from "../../../../router/HistoryStack";

export const HistoryList: FC<HistoryListProps> = ({ offers }) => {
  const navigation = useNavigation<HistoryStackNavigatorType>();

  const navigateToHistoryOfferDetails = (item: JobPositionDetails) => {
    navigation.push("HistoryOfferDetails", { jobOffer: item });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: JobPositionDetails;
    index: number;
  }) => (
    <Pressable
      className="border-b-0.5 py-2 flex-row justify-between items-center"
      onPress={() => navigateToHistoryOfferDetails(item)}
    >
      {item.companyLogoImageSource ? (
        <Avatar.Image size={48} source={{ uri: item.companyLogoImageSource }} />
      ) : (
        <Avatar.Icon icon="offer" />
      )}
      <View className="items-center">
        <CustomText weight={"medium"}>{item.positionName}</CustomText>

        <CustomText>{item.seniority}</CustomText>
      </View>

      <CustomText weight={"medium"}>{item.companyName}</CustomText>
    </Pressable>
  );

  return <FlatList data={offers} renderItem={renderItem} />;
};
